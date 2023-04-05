const express = require("express");
const router = express.Router();
const propData = require("../Schema/propertyCard");

router.get("/:type", async (req,res)=>{
    const id = req.params.type;
    await propData.find({
        propertyType: id
    }).then((result)=>{
        console.log(result);
        res.json({data:result});
    })
})

module.exports = router;