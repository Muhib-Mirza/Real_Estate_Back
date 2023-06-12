 const mongoose = require("mongoose");

 const Schema = mongoose.Schema;

 const propertySchema = new Schema({
    avatar:{
        type:String,
        require:true,
    },
    houseImage:{
        type:String,
        require:true,
    },
    uname:{
        type:String,
        require:true,
    },
    room:{
        type:String,
        require:true,
    },
    bath:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true,
    },
    sale:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true
    },
    propertyType:{
        type:String,
        require:true,
    },
    cityName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
 });

 const propmodel = mongoose.model("propmodel", propertySchema);

 module.exports = propmodel;
