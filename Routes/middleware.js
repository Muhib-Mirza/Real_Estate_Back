const jwt = require("jsonwebtoken");

const middleware = async (req,res,next)=>{
    const token = await req.cookies.Session;
        if(token == null || token == ""){
            res.json({message1:"Failed"})
        }else{
            const result = await jwt.verify(token,`${process.env.SECRET_KEY}`)
                req.data = {data:result.email}
                next();
        } 
    }

module.exports = middleware;