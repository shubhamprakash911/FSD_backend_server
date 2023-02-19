const mongoose = require("mongoose")

const noteSchema= mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    userId:{type:String,required:true},
    author:{type:String,required:true}
},{versionKey:false})

const noteModel= mongoose.model("note",noteSchema);

module.exports={noteModel}