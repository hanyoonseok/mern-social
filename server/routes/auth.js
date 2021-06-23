const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');

//회원가입
router.post('/signup',(req,res)=>{
    const{name,email,password}=req.body;
    if(!email || !password || !name){ 
        //아이디, 이름, 비밀번호중 하나라도 누락이면 에러메시지
        return res.status(422).json({error:"please add all the field"});
    }

    //중복된 이메일 사용시
    //key:value(지역변수)
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        //mongoose 사용자정보에서 password를 암호화
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

//로그인 할 때
router.post('/signin',(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"please add email or password"});
    }
    User.findOne({email:email})
    .then(savedUser=>{ //존재하는 이메일인지 확인
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{//입력 비번과 사용자 비번 일치하면
            if(doMatch){
                res.json({message:"successfully signed in"});
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})
module.exports = router;