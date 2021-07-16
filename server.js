const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public' )));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes', function(req, res) {
res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('/api/notes', function(req, res) {
    fs.readFile("./db/db.json",(err, data) =>{
        if(err) throw err;
        res.json(JSON.parse(data));
    });
});

