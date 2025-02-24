const jwt = require('jsonwebtoken');
const errorHandler = require("../utils/appError")
const httpStatusText = require("../utils/httpStatusText")

const verifyToken = (req, res, next) => {
    const authToken = req.headers['Authorization'] || req.headers["authorization"];
    if(!authToken) 
        return next(errorHandler.createError(401, "Token is needed !!", httpStatusText.ERROR))
    
    try{
        const token = authToken.split(' ')[1];
        const UserContent = jwt.verify(token , process.env.JWT_SECRET_KEY );   
        req.UserContent = UserContent;
        next();
    }catch(err){
    const error= errorHandler.createError(401, "Unauthorized access please log in first", httpStatusText.ERROR);
    next(error);
    }
}
    module.exports = verifyToken