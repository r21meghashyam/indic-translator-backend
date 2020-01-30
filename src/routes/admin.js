const express = require('express');
const {isEmpty} = require('../utils');
const router = express.Router();


router.post('/add-language',async(req,res,next)=>{
    try{
        if(!req.session.user){
            res.json({
                status: 400,
                response: "Not logged in"
            });
            return;
        }
        if(!req.session.user.isAdmin){
            res.json({
                status: 400,
                response: req.session.user+" is not an admin."
            });
            return;
        }

        let name = req.body.name;
        let script = req.body.script;
        
        if(isEmpty(req,res,['name','script']))
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

exports = router;