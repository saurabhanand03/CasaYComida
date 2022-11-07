const express = require("express");
const UserModel = require("../models/users");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { name, email, username, password } = req.body;
    try {
        if(!name || !email || !username || !password) {
            return res.status(400).json({ message: "Missing credentials!"});
        }
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists!"});
        }
        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        const user = await newUser.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post("/signin", async (req, res) => {
    const { email , password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email });
        if(oldUser) {
            return res.status(401).json({ message: "User does not exist!" });
        }
    }

    catch (err) {

    }
});

module.exports = router;