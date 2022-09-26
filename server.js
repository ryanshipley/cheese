require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;

const express = require('express');
const app = express();

app.get("/", (req, res)=>{
    res.send("hello sir");
});

app.listen(PORT);