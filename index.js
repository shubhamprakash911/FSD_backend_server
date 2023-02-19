const express= require("express")
const {connection} = require("./config/db")
const {authorization} = require("./middleware/authorization.middleware")
 const {noteRouter} = require("./routes/note.route");
const {userRouter} = require("./routes/user.route");
const cors=require("cors")

require("dotenv").config()

app.get("/",(req,res)=>{
    res.send("Welcome")
})

const app =express()
app.use(express.json())
app.use(cors())

 app.use("/users",userRouter)
 app.use(authorization)
 app.use("/note",noteRouter)




app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connect to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`http://localhost:${process.env.port}`)
})