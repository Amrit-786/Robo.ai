const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', async(req,res)=>{
    const {name,email,password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'user already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //store new user in the database
         user = new User({
            name,
            email,
            password:hashedPassword,
        })
        await user.save();

        //generate jwt token
        const token = jwt.sign({userId:user._id}, 'secretkey', {expiresIn : '1h'});
        res.json({token});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.post('/login', async(req,res)=>{
    const {email,password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'Invalid Credentials'});
        }

        //compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid Credentials'});
        }

        //Generate JWT Token
        const token = jwt.sign({userId: user._id},'secretkey', {expiresIn:'1h'});
        res.json({token});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/protected', auth, (req,res)=>{
    res.json({msg:'This is a protected route', userId:req.user});
})

module.exports = router;