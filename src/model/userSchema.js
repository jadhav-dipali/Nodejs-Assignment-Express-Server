const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    isPromoted:{
        type:Boolean,
        default:null
    }
})

const User = new mongoose.model("User" , userSchema)

module.exports = User;