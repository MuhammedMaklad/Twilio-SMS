require("dotenv").config();


const app = require('express')()
const port = process.env.PORT || 3000

const mongoose = require('mongoose')

const authRouter = require("./routes/auth")

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