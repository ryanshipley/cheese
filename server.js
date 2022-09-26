require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;

const express = require('express');
const app = express();

// import mongoose
const mongoose = require("mongoose");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

app.get("/", (req, res)=>{
    res.send("hello sir");
});

app.listen(PORT);