const express = require("express");
const router = express.Router();
const propData = require("../Schema/propertyCard");

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

module.exports = router;