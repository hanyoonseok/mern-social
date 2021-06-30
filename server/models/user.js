const mongoose = require('mongoose');
const{ObjectId}=mongoose.Schema.Types;

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
    pic:{
        type:String,
        default:"https://res.cloudinary.com/hyoonseok/image/upload/v1625024753/default_profile_t8mjc4.png"
    },
    followers:[{type:ObjectId, ref:"User"}],
    following:[{type:ObjectId, ref:"User"}]
})

//userSchema를 User라는 이름으로 사용하겟다
module.exports = mongoose.model("User", userSchema);