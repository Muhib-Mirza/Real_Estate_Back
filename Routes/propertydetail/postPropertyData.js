const express = require("express");
const router = express.Router();
const multer = require("multer");
const propData = require("../../Schema/propertyCard");
const middleware = require("../middleware");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "../public/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
});

const upload = multer({storage});


//Add Card Data
router.post("/addCard", middleware ,upload.array("image",2) , async (req,res)=>{
    if(!req.files){
        res.json({data:"Failed"})
    }else{
        const data = new propData({
            avatar:req.files[1].originalname,
            houseImage:req.files[0].originalname,
            uname:req.body.uname,
            room:req.body.room,
            sale:req.body.sale,
            location:req.body.location,
            bath:req.body.bath,
            price:req.body.price,
            propertyType:req.body.propertyType,
            cityName:req.body.cityName,
            email:`${req.data.data}`,
        });
        data.save().then((result)=>{
            if(!result){
                res.json({message:"Failed"})
            }else{
                res.json({message:"Passed"})
            }
        })
    }
})

router.get("/",(req,res)=>{
    res.render("main")
})

module.exports = router;