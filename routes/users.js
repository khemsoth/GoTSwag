// const express = require('express')
// // const router = express.Router()
// const User = require('../database/models/user')
//const passport = require('../passport');
//heroku push
const userRouter = require("express").Router();
var bcrypt = require('bcrypt');
const db = require('../models');
process.env.SECRET_KEY = "secret";

userRouter.post("/orders", (req, res) => {

    //  This route returns appropriate user if his e-mail is registered in database.

    db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            console.log("orders catch err=" + err);
            res.status(400).json({ error: err })
        })
});

//---------------------------------------------------------------------------------

userRouter.put("/api/account", function(req, res)    {

    // This routes updates user account.

    db.Users.update({
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        creditCardNumber: req.body.creditCardNumber,
        expDate: req.body.expDate,
        cvv: req.body.cvv
    },
    {
        where:  {
            email: req.body.email
        }
    }).then(function (dbUsers)  {
        res.json(dbUsers);
    }).catch(err => {
        console.log("weird error");
        res.status(400).json({error: err});
    });    
});

//---------------------------------------------------------------------------------

userRouter.put("/api/buy", function(req, res)    {
    // buy route created!
    console.log("buy route called");
    db.Users.update({
        swag1quantity: req.body.swag1quantity,
        swag2quantity: req.body.swag2quantity,
        swag3quantity: req.body.swag3quantity,
        swag4quantity: req.body.swag4quantity,
        swag5quantity: req.body.swag5quantity,
        swag6quantity: req.body.swag6quantity,
        swag7quantity: req.body.swag7quantity,
        swag8quantity: req.body.swag8quantity,
        swag9quantity: req.body.swag9quantity,
        swag10quantity: req.body.swag10quantity
    },
    {
        where:  {
            email: req.body.email
        }
    }).then(function (dbUsers)  {
        res.json(dbUsers);
    }).catch(err => {
        console.log("weird error");
        res.status(400).json({error: err});
    });    
});

//---------------------------------------------------------------------------------

userRouter.put("/api/logout/:email", function (req, res)    {
    
    //  This route logs user out.
    
    db.Users.update({
        isLoggedIn: 0
    },
    {
        where:  {
            email: req.params.email
        }
    }).then(function (dbUsers) {
        res.json(dbUsers);
    }).catch(err => {
        console.log("weird error");
        res.statusMessage(400).json({error: err});
    });
});

//---------------------------------------------------------------------------------

userRouter.post("/login", (req, res) => {

    //  This route logs user in.

    db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                console.log("then user exists, start bcrypt compareSync");
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log("compareSync success");
                    res.send({ message: true, user })
                    console.log(user);
                } else {
                    console.log("compareSync failed");
                    alert("Something went wrong please try again");
                }
            } else {
                console.log("else no user");
                res.status(400).json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            console.log("login catch err=" + err);
            res.status(400).json({ error: err })
        })
})

//---------------------------------------------------------------------------------

userRouter.get("/api/allusers", function (req, res) {

    //  This route returns all users.

    db.Users.findAll({}).then(function (dbUsers) {
        res.json(dbUsers);
    });
});

//---------------------------------------------------------------------------------

userRouter.get("/api/user:email", function (req, res) {

//  This route finds a user by e-mail.

    db.Users.findOne({}).then(function (dbUsers) {
        res.json(dbUsers);
    });
});

//---------------------------------------------------------------------------------

userRouter.post("/register", (req, res) => {

    //  This router registers user.

    const now = new Date()
    const userData = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isLoggedIn: 1,
        created_at: now
    }
    db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    db.Users.create(userData)
                        .then(user => {
                            res.json({ status: user.email + " registered" })
                        })
                        .catch(err => {
                            res.send("error: " + err)
                        })
                })
            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//---------------------------------------------------------------------------------

userRouter.put("/login", (req, res) => {

    //  This route logs user in.

    db.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(userDb => {
            console.log(userDb.dataValues.email);
            let user = userDb.dataValues;
            db.Users.update({ isLoggedIn: 1 }, { where: { email: user.email } })
                .then(user => {
                    res.json({ status: "User's isLoggedIn has changed" })
                })
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

module.exports = userRouter;
