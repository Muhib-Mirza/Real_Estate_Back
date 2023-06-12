const express = require("express");
const router = express.Router();
const user = require("../../Schema/Login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

router.post("/register",(req,res)=>{
    user.find({
        email:req.body.email
    }).then((result)=>{
        if(result == ""){
            const token = jwt.sign({email:req.body.email},`${process.env.SECRET_KEY}`,{
                expiresIn:"3d"
            });
            res.cookie("Session",token,{
                expires:new Date(Date.now()+3*60*60*1000),
            });
            bcrypt.hash(req.body.pass, 12).then((code)=>{
                const newUser = new user({
                    username:req.body.username,
                    email:req.body.email,
                    pass:code,
                });
                newUser.save();
                res.json({data:"Success"});
            })
        }else{
            res.json({data:"Failed"})
        }
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;