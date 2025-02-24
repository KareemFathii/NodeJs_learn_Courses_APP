
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/users.model");
const errorhandler = require("../utils/appError");
const httpstatustext = require("../utils/httpStatusText");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generate_Token');
// const {validationResult} = require('express-validator');


const getAllUsers =  async (req, res) => {
    const query = req.query;
    const limit = query.limit;
    const page = query.page || 1;
    const skip = (page-1) * limit;
    const users = await User.find({},{__v : false , password : false}).limit(limit).skip(skip);
    res.status(200).json({status : httpstatustext.SUCCESS, data: users});

}
const getUserById = asyncWrapper( async (req, res , next) => {
    const user_id = req.params.id ;
    const user = await User.findById(user_id);
    if(!user){
        const error = errorhandler.createError(404, "User not found" ,httpstatustext.FAIL );
        return next(error);
    }
    res.status(200).json({status : httpstatustext.SUCCESS, data: user});
    }
)
const UpdateUser = asyncWrapper( async (req,res,next) => {
    const user_id = req.params.id;
    const userData = req.body;
    const user = await User.updateOne({_id : user_id}, {$set:{...userData}});
    res.status(200).json({status : httpstatustext.SUCCESS, data: user});
    }    
)
const deleteUser = asyncWrapper( async (req,res,next) => {
    const user_id = req.params.id;
    const deletedUser = await User.deleteOne({_id : user_id});
    if(deletedUser.deletedCount === 0){
        const error = errorhandler.createError(404, "User not found" ,httpstatustext.FAIL );
        return next(error);
    }
    res.status(200).json({status : httpstatustext.SUCCESS, data: null});
    }
)   

const register = asyncWrapper( async (req,res,next) => {

    const {name , email , password , role , avatar} = req.body;
    const oldUser = await User.findOne({email : email});
    if(oldUser){
        const error = errorhandler.createError(409, "User already exists" ,httpstatustext.FAIL );
        return next(error);
    }
    const hashedpassword = await bcrypt.hash(password , 10 );
    
    const newUser = await new User(
        {name,
         email,
         password : hashedpassword ,
         role,
         avatar : req.file.filename});
    const token = await generateToken({email :newUser.email, id :newUser._id , role })
    newUser.token = token;
    await newUser.save();
    res.status(201).json({status : httpstatustext.SUCCESS, data: {token} });

} );


const login = asyncWrapper( async (req,res,next) => {
    const { email , password } = req.body;
    const oldUser = await User.findOne({email : email});
    if(!oldUser){
        const error = errorhandler.createError(404, "Email address or password is incorrect" ,httpstatustext.FAIL );
        return next(error);
    }
    const matchedpassword = await bcrypt.compare(password , oldUser.password)
    if(!matchedpassword){
        const error = errorhandler.createError(404, "Email address or password is incorrect" ,httpstatustext.FAIL );
        return next(error);
    }
    if(oldUser && matchedpassword){
        const token = await generateToken({email :oldUser.email, id :oldUser._id , role :oldUser.role})
        res.status(200).json({status : httpstatustext.SUCCESS, data: {token} });
    }
})



module.exports = {
    getAllUsers,
    getUserById,
    UpdateUser ,
    deleteUser ,
    login ,
    register
}