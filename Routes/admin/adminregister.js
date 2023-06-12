const express = require("express");
const router = express.Router();
const multer = require("multer");
const admin = require("../../Schema/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "../public/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage});

router.post("/joinus", upload.single("avatar") ,(req,res)=>{
    if(!req.file || !req.body){
        res.json({message:"Failed"})
    }else{
        const token = jwt.sign({email:req.body.email},`${process.env.SECRET_KEY}`,{
            expiresIn:"3d"
        })
        res.cookie("sessioninfo",token,{
            expires:new Date(Date.now()+ 3*60*60*1000)
        })
        console.log(req.body);
        console.log(req.file.originalname);
        bcrypt.hash(req.body.pass, 12).then((result)=>{
        const admindata = new admin({
            uname:req.body.uname,
            email:req.body.email,
            pass:result,
            contact:req.body.contact,
            avatar:req.file.originalname
        });
        admindata.save();
        res.json({message:"Success"})
    })
    }
})

module.exports = router;