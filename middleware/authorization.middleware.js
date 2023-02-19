const jwt = require("jsonwebtoken");

const authorization=(req,res,next)=>{
    let token= req.headers.authorization
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
            req.body.userId=decoded.userId
            req.body.author=decoded.author
            next()
        }else{
            res.send({"msg":"please login first"})
        }
    })

}

module.exports={authorization}
