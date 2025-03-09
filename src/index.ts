require("dotenv").config();

import {Request, Response} from "express"
import express from "express"
const app = express()
const port = process.env.PORT || 3000

import mongoose from 'mongoose';

import {authRouter} from "./routes/auth.route";

app.use(express.json())
app.get("/api/v1/test", (req :Request, res : Response) => {
    res.status(200).send("Muhammed on da code")
})
app.get('/api/v1/auth',authRouter)
app.use((req:Request, res:Response) => {
    res.status(404).send("Page not found")
})


mongoose.connection.once('open',() => {
    console.log("Connected to MongoDB");
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`);
    });
})

mongoose.connection.on("error", (err: Error | any) => {
    console.error(`Connection error: ${err.message}`);
})