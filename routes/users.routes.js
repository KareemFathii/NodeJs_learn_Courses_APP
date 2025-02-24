const express = require('express');
const multer  = require('multer')

const router = express.Router();

// const Uservalidation = require("../middlewares/users.validation")
const uservalidation = require("../middlewares/users.validation")

const diskStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        console.log(file)
        cb(null, './uploads')
    },
    filename : (req,file,cb) => {
        const ext = file.mimetype.split('/')[1]
        const contentname = `(${file.fieldname})-${Date.now()}.${ext}`
        cb(null, Date.now() + '-' + file.originalname)
    }
    
})
const fileFilter = (req,file,cb) => {
    const image_type = file.mimetype.split('/')[0]
    if(image_type === 'image'){
        return cb(null,true)
    }else{
        return cb(appError.createError(400,"Please upload an image file",httpStatusText.FAIL),false)
    }
}


const upload = multer({ storage: diskStorage , fileFilter })
const userControllers = require("../controllers/users.controllers");
const verifyToken  = require('../middlewares/verifyToken');
const appError = require('../utils/appError');

router.get('/',verifyToken,userControllers.getAllUsers)
router.route('/:id')
.get(userControllers.getUserById)
.patch(userControllers.UpdateUser)
.delete(userControllers.deleteUser)
router.post('/login', userControllers.login)
router.post('/register' , upload.single('avatar') ,uservalidation,userControllers.register)
module.exports = router;