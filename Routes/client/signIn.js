const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const user = require("../../Schema/admin");
const {cookie} = require("../../Function/cookies")

router.post("/signIn",(req,res)=>{
    user.findOne({
        email:req.body.email
    }).then((result)=>{
        if(result == null){
            res.json({data:"Failed"})
        }else{
            bcrypt.compare(req.body.pass,result.pass).then((reslt)=>{
                if(reslt == true){
                    cookie(req.body.email,res)
                    res.json({data:"Sucess"})
                }else{
                    res.json({data:"Failed"})
                }
            })
        }
    })
})

module.exports = router;