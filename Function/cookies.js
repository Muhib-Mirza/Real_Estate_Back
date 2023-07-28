const jwt = require("jsonwebtoken");

const cookie = (email,res)=>{
        const token = jwt.sign({email:email},`${process.env.SECRET_KEY}`,{
            expiresIn: "3d",
        });
        res.cookie("Session",token,{
            expires: new Date(Date.now()+3*60*60*1000)
        })
}

module.exports = {cookie};