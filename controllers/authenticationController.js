const md5 = require('md5');
const User = require("../models/userModel.js");

// GET
// landing page for bookLibrary
exports.getWelcome = function (req, res) {
    res.send("welcome");
}

// POST
// login authentication
exports.postLogin = function (req, res) {
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({ username: username }, async function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    foundUser.signedIn = true;
                   const loggedInUser= await foundUser.save();
                   res.send(`${loggedInUser.username} logged in successfully` )
                    
                } else {
                    res.send(`Wrong password. Please try again.`);
                }
            } else {
                res.send(`${req.body.username}  not found. Enter a valid username.`);
            }
        }
    });
}
// POST
// registration page
exports.postRegister = function (req, res) {
    User.findOne({ username: req.body.username }, async function (err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            if (foundUser == null) {
                const newUser = await new User({
                    username: req.body.username,
                    password: md5(req.body.password),
                    signedIn: false
                });
              const savedUser=  await newUser.save();
                res.send(`New registered user details ${savedUser}`)
                // res.redirect("/");
            } else {
                res.send( `${req.body.username} already exists. Please use another username`);
            }
        }
    });
}