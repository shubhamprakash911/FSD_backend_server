
const express= require("express")
const {userModel} = require("../model/user.model")
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter= express.Router();

userRouter.get("/",async(req,res)=>{
    try {
        const userData=await userModel.find()
        res.send(userData)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}= req.body
    const user=await userModel.find({email})
    let token;
    try {
        if(user.length==1){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    token=jwt.sign({userId:user[0]._id,author:user[0].name},"masai",{expiresIn:"1h"})   
                   res.send({"msg":`${user[0].name} is login`,"token":token});
                }else{
                    res.send({"msg":err.message})
                }   
            })
        }else{
           res.send({"msg":"please login first"})
        }
    } catch (error) {
        res.send({"msg":error.message})
    }
})

userRouter.post("/register",async(req,res)=>{
      const {name,email,pass}= req.body
      const user=await userModel.find({email})
      try {
        if(user.length==0){
            bcrypt.hash(pass,5, async function(err, hash) {
                if(err)res.send({"msg":err.message});
                else{
                    await new userModel({name,email,pass:hash}).save()
                    res.send({"msg":"user has been register"})
                }
            });
        }else{
          res.send({"msg":"user already register"})
        }
   
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={userRouter}