const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://00rohansah00kr:rohan%22rj07@cluster0.ydojkd9.mongodb.net/kanban?retryWrites=true&w=majority")

module.exports={
    connection
}