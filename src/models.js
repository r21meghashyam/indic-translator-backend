const mongoose = require('mongoose');

const User = mongoose.model('User',{ 
    name: String,
    email:String,
    password:String,
    date: Date,
    points: Number,
    isAdmin: Boolean,
    languages: [String]
}
);

const Language = mongoose.model('Language',{
name: String,
script: String
}
);

exports = {User,Language}