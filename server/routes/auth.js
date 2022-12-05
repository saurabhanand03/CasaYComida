const express = require("express");
const UserModel = require("../models/users");
const router = express.Router();
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

/**
 * @description: This function is used to register a new user for the application
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {string} confirmPassword - The confirm password of the user
 */

router.post("/signup", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if(!name || !email || !password) {
            return res.status(400).json({ message: "Missing credentials!"});
        }

        //We use validator library to check whether the email is valid or not
        if(!validator.isEmail(email)) {
            return res.status(401).json({ message: "Not a valid email!"});
        }

        //We use validator library to check whether the password is strong or not
        if(!validator.isStrongPassword(password)) {
            return res.status(401).json({ message: "Bad password! Choose a different password"});
        }

        if(password !== confirmPassword) {
            return res.status(401).json({ message: "Passwords do not match!"});
        }
        
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists!"});
        }
        
        //We use bcrypt to hash the user's password before storing it into the database
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

/**
 * @description: This function is used to login the user into the application
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 */

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

        //We use bcrypt to compare the inputted password with the hashed password stored in the database
        const correctPwd = await bcrypt.compare(password, existingUser.password);

        if(!correctPwd) {
            return res.status(401).json({ message: "Invalid credentials!"});
        }

        if(correctPwd) {
            //We use jwt to create token for the user 
            const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
            res.status(200).json({ success: true, token, msg: "Login successful!"});
        }
    }
    catch (err) {
        res.status(500).json({ message: "Access denied!"});
    }
});

/**
 * @description: This function is used to send a reset password link to the user's email using nodemailer
 * @param {string} email - The email of the user
 */

router.post("/forgotpassword", async (req, res) => {
    const { email } = req.body;
    try {
        if(!email || !validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email!"});
        }
        
        const existingUser = await UserModel.findOne({ email });
        
        if(!existingUser) {
            return res.status(400).json({ message: "User does not exist!"});
        }
        
        //Create a token for the user to use for resetting the password
        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h'});
        const link = "http://" + req.hostname + ":3001/resetpassword?token=" + token;
        const sentMail = sendEmail(existingUser.email, link);
        
        if(!sentMail) {
            return res.status(500).json({ message: "Email not sent!"});
        }
        
        else {
            return res.status(200).json({ message: "Email sent successfully! Please check your inbox!"});
        }
    }
    catch (err) {
        res.status(500).json({ message: "Email not sent!"});
    }
});

/**
 * @description: This function is used to reset the user's password
 * @param {string} email - The email of the user
 * @param {string} password - The new password of the user
 * @param {string} verifyNewPassword - Confirm the new password
 */

router.post("/resetpassword", async (req, res) => {
    const { email, newPassword, verifyNewPassword } = req.body;
    try {
        if(!email || !newPassword || !verifyNewPassword) {
            return res.status(400).json({ message: "Please fill in all fields!"});
        }
        
        if(!validator.isEmail(email)) {
            return res.status(401).json({ message: "Not a valid email!"});
        }
        
        const existingUser = await UserModel.findOne({ email });
        
        if(!existingUser) {
            return res.status(401).json({ message: "User does not exist!"});
        }
        
        if(newPassword !== verifyNewPassword) {
            return res.status(401).json({ message: "Passwords do not match!"});
        }

        if(!validator.isStrongPassword(newPassword)) {
            return res.status(401).json({ message: "Bad password"});
        }
       
        const saltRounds = 12;
        const hashPassword = await bcrypt.hash(newPassword, saltRounds);
        
        const samePassword = await bcrypt.compare(newPassword, existingUser.password);
        if(samePassword) {
            return res.status(401).json({ message: "New password cannot be same as old password!"});
        
        }

        const updateUser = await UserModel.findOneAndUpdate({email}, {
            password: hashPassword
        });

        if(updateUser) {
            return res.status(200).json({ message: "Password updated successfully!"});
        }
        
        else {
            return res.status(500).json({ message: "Password not updated!"});
        }
    }
    catch (err) {
        res.status(500).json({ message: "Access denied!"});
    }
});

module.exports = router;