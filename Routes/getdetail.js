const express = require("express");
const router = express.Router();
const propData = require("../Schema/propertyCard");

router.get("/detail/:id",(req,res)=>{
    propData.findOne({
        _id:req.params.id
    }).then((result)=>{
        if(result == ""){
            res.json({data:"Failed"})
        }else{
            res.json({data:result})
        }
    })
})

module.exports = router;