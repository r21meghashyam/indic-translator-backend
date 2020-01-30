const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const {User,Language} = require('./models');
const UserRoutes = require("./routes/user");
const AdminRoutes = require("./routes/admin");

mongoose.connect('mongodb://localhost:27017/indic-translator', {useNewUrlParser: true,useUnifiedTopology: true});
const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

app.use("/user",UserRoutes);
app.use("/admin",AdminRoutes);

app.all("*",(req,res,next)=>{
    res.json({
        status:404,
        response:"not found"
    })
    next();
})

app.use(router);

app.listen(8080,()=>{  
    console.log("Server running on port 8080");
})