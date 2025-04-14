import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"

dotenv.config()

// console.log(process.env.MONGO_URI)

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()) // to parse json data from the request body

app.use("/api/products", productRoutes)



app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})
 
