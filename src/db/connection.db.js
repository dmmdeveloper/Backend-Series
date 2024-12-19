import mongoose from "mongoose"
import { dbName } from "../constants.js"
import chalk from "chalk";


export const DBConnection = async ()=>{
    try {
    console.log(chalk.bgYellow("\t\t\t Connecting......."));
        const db = await mongoose.connect(`${process.env.DB_URL }/${dbName}`) ;
        console.log(chalk.bgGreen("\t ** Data Base connection Success Fully !!!"));
        console.log("Host :" , db.connection.host);
        console.log("Name :" , db.connection.name );

    } catch (error) {
        console.log(chalk.bgRed("\t Data Base Connectiong Failed :))") , error);
    }
}