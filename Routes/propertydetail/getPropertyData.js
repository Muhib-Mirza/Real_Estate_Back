const express = require("express");
const router = express.Router();
const propData = require("../../Schema/propertyCard");
const middleware = require("../middleware");
const jwt = require("jsonwebtoken");

//HomePage Api
router.get("/homedata",(req,res)=>{
    propData.find().limit(7).then((result)=>{
        if(!result){
            res.json({data:"Failed"})
        }else{
            res.json({data:result})
        }
    })
})

//Properties Api
router.get("/alldata",(req,res)=>{
    propData.find().then((result)=>{
        if(!result){
            res.json({data:"Failed"})
        }else{
            res.json({data:result})
        }
    })
})


router.get("/authentication", middleware ,(req,res)=>{
    if(req.data.data == null || req.data.data == ""){
        res.json({message:false})
    }else{
        const token = jwt.sign({email:req.data.data},`${process.env.SECRET_KEY}`,{
            expiresIn: "3d",
        });
        res.cookie("Session",token,{
            expires: new Date(Date.now()+3*60*60*1000)
        });
        if(req.data.admin == null || req.data.admin == ""){
            res.json({message1:true})
        }else{
            res.json({message1:true,message2:true});
        }
    }
})

module.exports = router;