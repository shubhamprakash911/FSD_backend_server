const express= require("express");
const {noteModel} = require("../model/note.model")
const noteRouter=express.Router();

noteRouter.get("/",async(req,res)=>{
    try {
        const noteData=await noteModel.find()
        res.send(noteData)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

noteRouter.post("/create",async(req,res)=>{
    try {
        await new noteModel(req.body).save()
        res.send({"msg":"note created"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const note=await noteModel.findOne({_id:req.params.id})
    try {
        if(note.userId===req.body.userId){
            await noteModel.findByIdAndUpdate({_id:req.params.id},req.body)
            res.send({"msg":"note updateted"})
        }else{
            res.send({"msg":"You are not authorized"})
        }
        
    } catch (error) {
        res.send({"msg":error.message})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const note=await noteModel.findOne({_id:req.params.id})
    try {
        if(note.userId===req.body.userId){
            await noteModel.findByIdAndDelete({_id:req.params.id})
            res.send({"msg":"note deleted"})
        }else{
            res.send({"msg":"You are not authorized"})
        }
        
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={noteRouter}