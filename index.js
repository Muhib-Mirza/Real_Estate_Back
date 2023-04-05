const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const data = require("./Routes/getPropertyData");
const addData = require("./Routes/postPropertyData");
const search = require("./Routes/search");
const FindByType = require("./Routes/findType");
const getDetail = require("./Routes/getdetail");
const SignIn = require("./Routes/signIn");

const mdb = "mongodb+srv://muhib_mirza:black70flash@muhib-collection.np2mvjd.mongodb.net/?retryWrites=true&w=majority"

app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));


app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set("view engine", "ejs")
app.use(data);
app.use(addData);
app.use(search);
app.use(FindByType);
app.use(getDetail);
app.use(SignIn);

mongoose.connect(mdb).then(()=>{
    app.listen(4000,()=>console.log("Server Created"))
}
).catch(err=>{
    console.log(err)
})