const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require(path.join(__dirname, "./routes/routes.js")));
app.use(express.static("public"));

module.exports = app;