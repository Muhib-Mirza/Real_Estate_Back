const express = require("express");
const router = express.Router();
const data = require("../Schema/propertyCard");

//SearchBar Api
router.get("/search/:btn",(req,res)=>{
    const btn = req.params.btn;
    data.find({
        sale: btn,
        type: req.body.type,
        cityName: req.body.city,
        price: {
            $lte: req.body.price
        }
    }).then((result)=>{
        console.log(result);
        if(result == ""){
            res.json({data:"Failed"});
        }else{
            res.json({data:result})
        }
    })
})

module.exports = router;