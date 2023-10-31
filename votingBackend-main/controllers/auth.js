const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();
const bcrypt = require("bcrypt");
const { getVoterByEmail_service, signUp_service, getVoterById_service } = require('../services/voter');


const signIn = (req, res) => {
    const body = req.body;
    getVoterById_service(body.voterID, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({
                success: 0,
                data: "email not in db"
            });
        }
        console.log(result);
        if (!result) {
            return res.json({
                success: 0,
                data: "Invalid email or password"
            });
        }
        bcrypt.compare(body.password, result.password, function (err, r) {
            // result == true
            if (r) {
                result.password = undefined;
                const token = jwt.sign({ id: result.id }, process.env.SECRET);
                res.cookie("token", token, { expire: new Date() + 9999 });
                return res.json({
                    token, success: 1, result,
                    message: "login successfully"
                });
                // const jsontoken = sign({ result: result }, "qwe1234", {
                //     expiresIn: "1h"
                // });
                // return res.json({
                //     success: 1,
                //     message: "login successfully",
                //     token: jsontoken
                // });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid voterID or password"
                });
            }
        });
    })
    // const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // res.cookie("token", token, { expire: new Date() + 9999 });

    // const { _id, name, email, role } = user;
    // return res.json({ token, user: { _id, name, email, role } })

}

const signUp = (req, res) => {
    const body = req.body;
    const saltRounds = 10;
    bcrypt.hash(body.password, saltRounds, function (err, hash) {
        body.password = hash
        console.log(body);
        signUp_service(body, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    data: "Not saving in dbs"
                });
            }
            return res.status(200).json({
                success: 1,
                data: result
            });

        })
    });

}

const signOut = (req, res) => {
    res.clearCookie("token");
    res.send("user signout successful");
};

//MIDDLEWARES
const isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

const isAuthenticated = (req, res, next) => {
    console.log(req.profile, "1234");
    console.log(req.auth);
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "not authenticated"
        });
    };
    next();
};

module.exports = { signIn, signUp, signOut, isSignedIn, isAuthenticated };