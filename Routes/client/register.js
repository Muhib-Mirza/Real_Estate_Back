const express = require("express");
const router = express.Router();
const user = require("../../Schema/admin");
const bcrypt = require("bcryptjs");
const {cookie} = require("../../Function/cookies");
const multer = require("multer");
const firebase = require("firebase/app");
const { ref,getStorage,uploadBytes,getDownloadURL } = require("firebase/storage")

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
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
                cookie(req.body.email,res)
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
            }
        }else{
            res.json({data:"Failed"})
        }
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;