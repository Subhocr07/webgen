const express = require('express');
const app = express();

const authenticationController = require("../controllers/authenticationController");
const libraryController = require("../controllers/libraryController");

app
    .route("/")
    .get(authenticationController.getWelcome);

app
    .route("/register")
    .post(authenticationController.postRegister);
// app.route("/register").post((req,res) => {
//     res.send(req.body)
// })

app
    .route("/login")
    .post(authenticationController.postLogin);

app
    .route("/library/:userID")
    .get(libraryController.getLibrary);

app
    .route("/library/:userID/signout")
    .post(libraryController.postSignout);

app
    .route("/library/:userID/issueBook")
    .post(libraryController.postIssueBook);

app
    .route("/library/:userID/returnBook")
    .post(libraryController.postReturnBook);

app
    .route("/library/:userID/newBook")
    .get(libraryController.getNewBook)
    .post(libraryController.postNewBook);

module.exports = app;