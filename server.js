const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('/api/notes', function (req, res) {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});


app.post('/api/notes', function (req, res) {
    let note = req.body;
    let allNotes = [];
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        allNotes = JSON.parse(data);
        note.id = allNotes.length;
        allNotes.push(note);
        fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) =>
            err ? console.error(err) : console.log("added note")
        );
        res.send(allNotes);
    });
});

app.delete('/api/notes/:id', function (req, res) {
    let deleteNote = req.params.id;
    let allNotes = [];
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        allNotes = JSON.parse(data);
        let newNotesList = allNotes.filter(note => note.id != deleteNote);
        fs.writeFile("./db/db.json", JSON.stringify(newNotesList), (err) =>
            err ? console.error(err) : console.log("deleted note")
        );
        res.send(newNotesList);
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function(){
    console.log("app listening on port : "+PORT);
});
