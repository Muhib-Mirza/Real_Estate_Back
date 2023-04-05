const express = require("express");
const router = express.Router();
const userData = require("../Schema/user");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");

multer({
  dest: "upload/",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


router.post("/register", upload.single("userimage") ,async (req, res) => {
  if (!req.body) {
    console.log(req.body);
    res.json({ message: "Failed" });
  } else {
    const token = jwt.sign( {email:req.body.email}, "ThisIsTheSecretKeyForTheJsonWebTokenMustBeHidden", {
      expiresIn: "7d"
    } )
    res.cookie('session',token,{
      expires:new Date(Date.now()+604800000)
    })
    const image = await sharp(`upload/${req.file.filename}`)
      .resize( 250, 250, { fit: "cover", position: "center", })
      .jpeg({ quality: 90 })
      .toBuffer();
    bcrypt.hash(req.body.pass, 10).then((result) => {
      const udata = new userData({
        username: req.body.uname,
        email: req.body.email,
        pass: result,
        image: {
          data: image,
          contentType: "img/jpeg",
        },
      });
      udata
        .save()
        .then(() => {
          res.json({ message: "Success" });
        })
        .catch((err) => {
          res.json({ message: "Failed" });
        });
    });
  }
});

router.post("/login",(req,res)=>{
  userData.findOne({
    email:req.body.email
  }).then((result)=>{
    if(result === null){
      res.json({message:"Failed"});
    }else{
      bcrypt.compare(req.body.pass, result.pass).then((result)=>{
        if(result === false){
          res.json({message:"Failed"});  
        }else{
          res.json({message:"Success"})
        }
      }).catch((err)=>{
        console.log(err);
        res.json({message:"Failed"});
      })
    }
  }).catch((err)=>{
    console.log(err);
  })
})

module.exports = router;