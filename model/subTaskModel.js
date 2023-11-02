const mongoose=require("mongoose");

const subtaskSchema=new mongoose.Schema({
    title:String,
    isCompleted:Boolean,
})

const SubTaskModel=mongoose.model("Subtask",subtaskSchema);

module.exports={
    SubTaskModel
}