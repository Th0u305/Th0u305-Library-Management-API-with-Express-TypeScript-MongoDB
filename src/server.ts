import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv"

let server : Server

const PORT = 5000;

dotenv.config()

async function main() {
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}`)
        server = app.listen(PORT, ()=>{
            console.log(`App is listing on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main()