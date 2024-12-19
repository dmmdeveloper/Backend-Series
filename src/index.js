import app from "./app.js";
import { DBConnection } from "./db/connection.db.js";
import dotenv from "dotenv"

dotenv.config({path:".env"})
const port = process.env?.PORT || 3001


DBConnection()
.then( ()=>{
    app.listen(port , ()=>{
        console.log(`=> App is Listening On http://localhost:${port}`);
    })
} )
.catch( (err)=>{
    console.log("EROR ON INDEX.js" , err);
    
} )