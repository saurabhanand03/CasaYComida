const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if(err) {
            res.json(error);
        }
        else {
            res.json(result);
        }
    });
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
});

app.listen(3001, () => {
    console.log("SERVER IS WORKING");
});