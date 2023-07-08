const express = require("express");
const router = express.Router();
const user = require("../../Schema/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const firebase = require("firebase/app");
const { ref,getStorage,uploadBytes,getDownloadURL } = require("firebase/storage")

const firebaseConfig = {
    apiKey: "AIzaSyC5tvKACFzRTwTYTiFNwzRThg2tmQDMEP8",
    authDomain: "final-year-project-392008.firebaseapp.com",
    projectId: "final-year-project-392008",
    storageBucket: "final-year-project-392008.appspot.com",
    messagingSenderId: "126459446373",
    appId: "1:126459446373:web:6e444f3745e08f79b3b28c",
    measurementId: "G-RRH15C8ZFV"
  };

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

const upload = multer({storage:multer.memoryStorage()});

router.post("/register",upload.single("avatar"),(req,res)=>{
    user.find({
        email:req.body.email
    }).then((result)=>{
        if(result == ""){
            if(!req.file || !req.body){
                res.json({message:"Failed"})
            }else{
                const token = jwt.sign({email:req.body.email},`${process.env.SECRET_KEY}`,{
                    expiresIn: "3d",
                });
                res.cookie("Session",token,{
                    expires: new Date(Date.now()+3*60*60*1000)
                })
                const StorageRef = ref(storage,req.file.originalname);
                const metadata = {
                    contentType : req.file.mimetype
                }
                uploadBytes(StorageRef,req.file.buffer,metadata).then(()=>{
                    getDownloadURL(StorageRef).then(url=>{
                        bcrypt.hash(req.body.pass, 12).then((result)=>{
                            const admindata = new user({
                                uname:req.body.uname,
                                email:req.body.email,
                                pass:result,
                                contact:req.body.contact,
                                avatar:url,
                            });
                            admindata.save();
                            res.json({message:"Success"})
                        })
                    })
                })
                // console.log(req.body);
                // console.log(req.file.originalname);
            }
        }else{
            res.json({data:"Failed"})
        }
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;