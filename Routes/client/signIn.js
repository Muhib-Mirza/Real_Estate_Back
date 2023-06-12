const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const user = require("../../Schema/Login");
const jwt = require("jsonwebtoken");

router.post("/signIn",(req,res)=>{
    user.findOne({
        email:req.body.email
    }).then((result)=>{
        if(result == null){
            res.json({data:"Failed"})
        }else{
            bcrypt.compare(req.body.pass,result.pass).then( (reslt)=>{
                if(reslt == true){
                    const token = jwt.sign({email:req.body.email},`${process.env.SECRET_KEY}`,{
                        expiresIn: "3d",
                    });
                    res.cookie("Session",token,{
                        expires: new Date(Date.now()+3*60*60*1000)
                    })
                    res.json({data:"Sucess"})
                }else{
                    res.json({data:"Failed"})
                }
            })
        }
    })
})

module.exports = router;