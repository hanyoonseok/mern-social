const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

//userSchema를 User라는 이름으로 사용하겟다
module.exports = mongoose.model("User", userSchema);