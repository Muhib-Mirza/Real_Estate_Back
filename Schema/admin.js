const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    uname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    pass:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
        require:true,
    },
    contact:{
        type:String,
        require:true,
    }
});

const admin = mongoose.model("admin",adminSchema);

module.exports = admin;