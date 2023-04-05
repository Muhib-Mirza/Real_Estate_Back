const express = require("express");
const router = express.Router();
const user = require("../Schema/user");
const bcrypt = require("bcryptjs");

router.post("/signin",(req,res)=>{
    user.findOne({
        email:req.body.email,
    }).then((result)=>{
        if(result == ""){
            res.json({data:"Failed"});
        }else{
            bcrypt.compare(req.body.pass,result.pass).then((result)=>{
                if(result === false){
                    res.json({message:"Failed"});  
                  }else{
                    res.json({message:"Success"})
                  }
            }).catch((err)=>{
                console.log(err);
                res.json({data:"Failed"});
            })
        }
    })
})

module.exports = router;