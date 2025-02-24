const {body} = require ('express-validator');

const UserValidation = [
    body("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters long')
        .trim()
    ,body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage('Invalid email address')
        .normalizeEmail()
        .trim()
    ,body("password")
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
        .trim()

];
 
module.exports =  UserValidation ;