const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/users");
const authenticate = require("../middleware/auth");

//CRUD operations for users

/**
 * @description: This function is used to create a new user into the database
 */
router.post('/', async (req, res) => {
    const user = req.body;
    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({message : err});
    }
});

/**
 * @description: This function is used to get a specific user with the object id from the database
 */
router.get('/:id', authenticate, async (req, res) => {
    const userID  = req.params.id;
    
    try {
        const user = await User.findById(userID);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({message : err});
    }
});

/**
 * @description: This function is used to get all the users from the database
 */

router.get('/', authenticate, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({message: err});
    }
});

/**
 * @description: This function is used to update a specific user's value(s) with their id within the database
 */

router.patch('/:id', authenticate, async (req, res) => {
    const userID = req.params.id;
    const { name, email, password } = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(500).send(`No user with the id: ${userID}`);
    }

    const updatedUser = { name, email, password, _userID: userID };
    await User.findByIdAndUpdate(userID, updatedUser, { new: true });
    res.status(201).json(updatedUser);
})

/**
 * @description: This function is used to delete a specific user with their id from the database
 */

router.delete('/:id', authenticate, async (req, res) => {
    const userID = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(500).send(`No user with the id: ${userID}`);
    }

    await User.findByIdAndRemove(userID);
    res.status(201).json({message: "User removed successfully"});
});

module.exports = router;