const jwt = require("jsonwebtoken");
const express = require("express");
const UserModel = require("../models/users");
const router = express.Router();

function authenticate (req, res, next) {
    const header = req.header.accessToken;
    if(header) {
        const token = header.split(" ")[1];

        jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (err, user) => {
            if(err) {
                return res.status(401).json("Invalid token!");
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json("Unauthorized!");
    }
}

module.exports = router;