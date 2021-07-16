const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public' )));


