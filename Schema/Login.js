const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    },
});

const login = mongoose.model("login",loginSchema);

module.exports = login;