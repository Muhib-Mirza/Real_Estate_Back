const express = require("express");
const router = express.Router();
const admin = require("../../Schema/admin")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/adminlog",(req,res)=>{
    if(!req.body){
        res.json({message:"Failed"})
    }else{
        admin.findOne({
            email:req.body.email
        }).then(async (result)=>{
            if(!result || result == null){
                res.json({message:"Failed"})
                console.log("Fail")
            }else{
                console.log(req.body.email);
                const token = await jwt.sign({email:req.body.email},`${process.env.SECRET_KEY}`,{
                    expiresIn:"3d"
                });
                res.cookie("SessionInfo",token,{
                    expires:new Date(Date.now()+3*60*60*1000),
                });
            bcrypt.compare(req.body.pass,result.pass).then((rest)=>{
                if(rest == true){
                    res.json({message:"Success"})
                }else{
                    res.json({message:"Failed"})
                }
            })}
        })
    }
})

module.exports = router;