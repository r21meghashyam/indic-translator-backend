//Modules
const express = require('express');
const bcrypt = require('bcrypt');
//Utils
const {isEmpty} = require('../utils');
//Models
const {User} = require('./models');

const router = express.Router();
router.post('/register',async(req,res,next)=>{
    try{
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let languages = req.body.languages;
        
        if(isEmpty(req,res,['name','email','password','languages']))
            return;
        
        let query = await User.findOne({email});
        
        if(query){
            res.json({
                status: 400,
                response: `${email} has already registered.`
            });
            return;
        }
        let passwordHash =  bcrypt.hashSync(password,10);
        let user = new User({name,email,password:passwordHash,languages});
        await user.save();
        res.json({
            status:200,
            response: "success"
        });
    } 
    catch(msg){    
        res.json({
            status:400,
            response: msg.message
        });
        console.log(msg)
    }
});

router.post('/login',async(req,res,next)=>{
    try{
        let email = req.body.email;
        let password = req.body.password;
        
        if(isEmpty(req,res,['email','password']))
            return;
        
        let user = await User.findOne({email});
        
        if(!user){
            res.json({
                status: 400,
                response: `${email} has not registered.`
            });
            return;
        }
        
        if(!bcrypt.compareSync(password,user.password)){
            res.json({
                status: 400,
                response: `invalid password.`
            });
            return;
        }
        req.session.user = user;
        res.json({
            status:200,
            response: "success"
        });
    }
    catch(msg){    
        res.json({
            status:400,
            response: msg.message
        });
        console.log(msg)
    }
});

router.get('/status',async(req,res,next)=>{
    try{
        if(!req.session.user){
            res.json({
                status: 200,
                response: {
                    loggedIn:false
                }
            });
            return;
        }
        let user = req.session.user;
        res.json({
            status:200,
            response: {
                loggedIn:true,
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: Boolean(user.isAdmin),
                languages: user.languages
            }
        });
    }
    catch(msg){    
        res.json({
            status:400,
            response: msg.message
        });
        console.log(msg)
    }
});

router.get('/logout',async(req,res,next)=>{
    try{
        req.session.destroy();
        res.json({
            status:200,
            response: "success"
        });
    }
    catch(msg){    
        res.json({
            status:400,
            response: msg.message
        });
        console.log(msg)
    }
});

exports = router;