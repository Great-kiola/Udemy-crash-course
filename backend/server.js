// const express = require("express");

import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";

dotenv.config()

// console.log(process.env.MONGO_URI)

const app = express();

app.get("/products", (req, res) => {
    res.send("List of products");
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
})

