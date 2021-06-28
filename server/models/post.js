const mongoose = require('mongoose');
const{ObjectId}=mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String, //url로 받을거라서
        required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    postedBy:{//User의 오브젝트아이디
        type:ObjectId,
        ref:"User" 
    }
})

mongoose.model("Post", postSchema);