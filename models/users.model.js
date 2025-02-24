const mongoose = require('mongoose');
const validation = require('validator');
const UserRoles = require('../utils/user.roles');
const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    }
    ,email : {
        type: String,
        required: true,
        unique: true ,
        validate : [validation.isEmail , "Invalid field of the email address"]
            
    }
    ,password : {
        type: String,
        required: true,
        minlength: 8, 
        mongooseType: 'password'
    } ,
    token : {
        type: String
    },
    role:{
        type: String,
        enum: [UserRoles.USER, UserRoles.ADMIN , UserRoles.MANAGER],
        default: UserRoles.USER
    },
    avatar : {
        type: String ,
        default :  "uploads/profile.png"
    }


})
const User = mongoose.model('User', UserSchema);
module.exports = User;