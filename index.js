const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const env = require("dotenv").config();
const data = require("./Routes/propertydetail/getPropertyData")
const addData = require("./Routes/propertydetail/postPropertyData")
const search = require("./Routes/search");
const FindByType = require("./Routes/findType");
const getDetail = require("./Routes/propertydetail/getdetail");
const SignIn = require("./Routes/client/signIn");
const logIn = require("./Routes/client/register");
const addProperty = require("./Routes/addProperty/addproperty");

const mdb = `${process.env.MONGO_URL}`;

app.use(cookieParser());

app.use(cors({
    origin:["https://final-year-project-lac.vercel.app/?vercelToolbarCode=42jwnt6i7cc90MZ","http://localhost:3000"],
    credentials:true,
}));

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
app.use(logIn);
app.use(addProperty);

mongoose.connect(mdb).then(()=>{
    app.listen(4000,()=>console.log("Server Created"))
}
).catch(err=>{
    console.log(err)
})