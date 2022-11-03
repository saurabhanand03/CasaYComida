const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/user", userRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connection Working"))
.catch((err) => console.log(err));

app.listen(3001, () => {
    console.log("SERVER IS WORKING");
});