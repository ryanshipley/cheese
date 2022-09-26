require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;

const express = require('express');
const app = express();

// import mongoose
const mongoose = require("mongoose");

const cors = require("cors");
const morgan = require("morgan");


const CheeseSchema = new mongoose.Schema({
    name : String,
    countryOfOrigin : String,
    image : String
});

const Cheese = mongoose.model("Cheese", CheeseSchema);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

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
// Test Route
app.get("/", (req, res)=>{
    res.send("hello sir");
});


//Index Route
app.get("/cheese", async(req, res) =>{
    try{
        res.json(await Cheese.find({}));
    } catch (error){
        res.status(400).json(error);
    };
});


//Create Route
app.post("/cheese", async (req, res)=>{
    try{
        res.json(await Cheese.create(req.body));
    } catch (error){
        res.status(400).json(error);
    };
});

app.listen(PORT);