const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { boardRouter } = require("./routes/boardRouter");

const app=express();
app.use(express.json())
app.use(cors());

app.use("/",boardRouter)

app.get("/",(req,res)=>{
    res.send("Home Page");
});

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
        console.log("Server is running at port 8080");
    } catch (error) {
        console.log(error);
    }
})