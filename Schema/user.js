const mongoose = require("mongoose");

const schema = mongoose.Schema;
const userSchema = new schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    pass:{
        type:String,
        require:true,
    },
    image:{
        data:Buffer,
        contentType:String,
    }
})

const userData = mongoose.model("userData", userSchema);
module.exports = userData;