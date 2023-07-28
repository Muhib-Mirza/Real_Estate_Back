const express = require("express");
const router = express.Router();
const multer = require("multer");
const firebase = require("firebase/app");
const { ref,getStorage,uploadBytes,getDownloadURL } = require("firebase/storage");
const middleware = require("../middleware");
const user = require("../../Schema/admin")
const property = require("../../Schema/propertyCard");

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

router.post("/addproperty", middleware, upload.single("image"),async (req,res)=>{
  user.findOne({
    email:`${req.data.data}`
  }).then((result)=>{
    console.log(result)
    if(!result || result == ""){
      res.json({data:"Failed"})
    }else{
      const StorageRef = ref(storage,req.file.originalname);
      const metadata = {
        contentType : req.file.mimetype
      }
      uploadBytes(StorageRef,req.file.buffer,metadata).then(()=>{
        getDownloadURL(StorageRef).then((url)=>{
          const propty = new property({
            avatar:result.avatar,
            houseImage:url,
            uname:result.uname,
            room:req.body.room,
            bath:req.body.bath,
            sale:req.body.sale,
            location:req.body.location,
            price:req.body.price,
            cityName:req.body.cityName,
            propertyType:req.body.propertyType
          })
          propty.save();
          res.json({data:"Succes"})
        }).catch((err)=>{
          console.log(err);
          res.json({data:"Failed"})
        })
      }).catch((err)=>{
        console.log(err);
        res.json({data:"Failed"})  
      })
    }
  })
})

//For Multiple images input
// router.post("/addproperty", upload.array("image",2) ,async (req,res)=>{
//   const images = req.files;
//   const imageURL = [];
//     for(const image of images){
//       const Storageref = ref(storage,image.originalname);
//       const metadata = {
//         contentType : image.mimetype
//       }
//       await uploadBytes(Storageref,image.buffer,metadata);
//       await getDownloadURL(Storageref).then(url =>{
//         imageURL.push(url);
//       })
//     }
//     console.log(imageURL[0]);
//     console.log(imageURL[1]);
// })

module.exports = router;