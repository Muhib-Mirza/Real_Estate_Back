const jwt = require("jsonwebtoken");

const middleware = async (req,res,next)=>{
    const token = await req.cookies.Session;
    if(!req.cookies.SessionInfo || req.cookies.SessionInfo == ""){
        if(token == null || token == ""){
            res.json({message1:"Failed"})
        }else{
            const result = await jwt.verify(token,`${process.env.SECRET_KEY}`)
                req.data = {data:result.email}
                next();
        } 
    }else{
       const admintoken = await req.cookies.SessionInfo;
        if(token == null || token == ""){
            res.json({message1:"Failed"})
        }else{
            const result = await jwt.verify(token,`${process.env.SECRET_KEY}`)
            const admin = await jwt.verify(admintoken,`${process.env.SECRET_KEY}`)
            req.data = {data:result.email,admin:admin.email}
            next();
        }
    }
}

module.exports = middleware;