const express = require("express");
const UserModel = require("../models/users");
const router = express.Router();
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password) {
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
        const saltRounds = 12;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
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
    const { email , password } = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({ message: "Missing credentials!"});
        }
        if(!validator.isEmail(email)) {
            return res.status(401).json({ message: "Not a valid email!"});
        }
        const existingUser = await UserModel.findOne({ email });
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

router.post("/forgotpassword", async (req, res) => {
    const { email } = req.body;
    if(!email || !validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email!"});
    }
    const existingUser = await UserModel.findOne({ email });
    if(!existingUser) {
        return res.status(400).json({ message: "User does not exist!"});
    }
    const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.RESET_PASSWORD_SECRET, { expiresIn: '30m'});
    const link = "http://" + req.hostname + ":3001/resetpassword?token=" + token;
    const sentMail = await sendEmail(existingUser.email, link);
    if(sentMail) {
        return res.status(500).json({ message: "Email not sent!"});
    }
    else {
        return res.status(200).json({ message: "Email sent successfully! Please check your inbox!"});
    }
});

router.post("/resetpassword", async (req, res) => {
});

module.exports = router;