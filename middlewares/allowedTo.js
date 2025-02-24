const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");

module.exports = (...roles) => {

    return (req , res , next) => {
   
        const userRoles = req.UserContent.role;
        if(!roles.includes(userRoles)){
            const error = appError.createError(403, "You don't have permission to access this Data",httpStatusText.FAIL);
            next(error);
        }
        next();
    }
}