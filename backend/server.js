import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import morgan from "morgan"
import { connectDB } from "./src/config/db.js"
import cookieParser from "cookie-parser"
import authRoute from "./src/routes/auth.route.js"
const app = express()

const port =  process.env.PORT || 4000

// global middleware
app.use(express.json())
app.use(cookieParser())
app.use((morgan("tiny")))

app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))

// routes
app.use("/api/auth" , authRoute)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port , ()=>{
    connectDB()
    console.log(`app is running on port ${port}`)
} )