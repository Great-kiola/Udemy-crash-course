// const express = require("express");

import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import Product from "./models/productModel.js"

dotenv.config()

// console.log(process.env.MONGO_URI)

const app = express();

// app.get("/products", (req, res) => {

    
//     res.send("List of products");
// });


app.post("/api/products", async (req, res) => {
    const product = req.body;


    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({sucess: false, message: "Please enter all the fields"})
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({sucess: true, data: newProduct})
    } catch(error){
        console.error("Error in creating product", error.message);
        res.status(500).json({sucess: false, message: "Internal server error"})
    }
})


app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
})
 
