const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET}=require('../keys');
const requireLogin = require('../middleware/requireLogin');

//로그인 되어있어야 접근 가능
router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user");
})

//회원가입
router.post('/signup',(req,res)=>{
    const{name,email,password,pic}=req.body;
    if(!email || !password || !name){ 
        //아이디, 이름, 비밀번호중 하나라도 누락이면 에러메시지
        return res.status(422).json({error:"please add all the fields"});
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
                name,
                pic
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
    const{email,password}=req.body
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
                //res.json({message:"successfully signed in"});
                //일치하면 무작위 토큰 생성
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                const{_id, name, email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
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