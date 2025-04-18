import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

import path from "path"

dotenv.config()

// console.log(process.env.MONGO_URI)
const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()) // to parse json data from the request body

app.use("/api/products", productRoutes)

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*name" , (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})
 
