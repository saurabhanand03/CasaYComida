const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());

//Establish routes
app.use("/user", userRoute);
app.use("/user", authRoute);

//Connect to MongoDB Atlas 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connection Working"))
.catch((err) => console.log(err));

//Start the server on localhost:3001
app.listen(3001, () => {
    console.log("SERVER IS WORKING");
});