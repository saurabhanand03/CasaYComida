const mongoose = require("mongoose");

/**
 * @description: this function is used to create a new user for the application
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 */
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, 
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
    }, 
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;