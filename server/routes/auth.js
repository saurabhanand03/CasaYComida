const express = require("express");
const UserModel = require("../models/users");
const router = express.Router();
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
    const { name, email, username, password } = req.body;
    try {
        if(!name || !email || !username || !password) {
            return res.status(400).json({ message: "Missing credentials!"});
        }
        if(!validator.isEmail(email)) {
            return res.status(401).json({ message: "Not a valid email!"});
        }
        if(!validator.isStrongPassword(password)) {
            return res.status(401).json({ message: "Bad password! Choose a different password"});
        }
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists!"});
        }
        const saltRounds = 11;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: hashPassword,
        });
        const user = await newUser.save();
        res.status(201).json({user});
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post("/signin", async (req, res) => {
    const { username , password } = req.body;
    try {
        if(!username || !password) {
            return res.status(400).json({ message: "Missing credentials!"});
        }

        const existingUser = await UserModel.findOne({ username });
        if(!existingUser) {
            return res.status(401).json({ message: "User does not exist!"});
        }

        const correctPwd = await bcrypt.compare(password, existingUser.password);

        if(!correctPwd) {
            return res.status(401).json({ message: "Invalid credentials!"});
        }

        if(correctPwd) {
            const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
            res.status(200).json({token});
        }
    }
    catch (err) {
        res.status(500).json({ message: "Access denied!"});
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;