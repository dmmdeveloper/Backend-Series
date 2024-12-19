import cookieParser from "cookie-parser";
import express from "express" ;
import cors from "cors"

const app = express();


// app Configuration

app.use(express.json({limit:"200kb"}))
app.use(express.urlencoded({limit:"100kb"  , extended:true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true, 
}));

// Routes Importing 
import userRouter from "./routes/user.routes.js";

// Routes Declaration

app.use("/user", userRouter)


export default app  ;