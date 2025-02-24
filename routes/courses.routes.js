const CoursesController = require('../controllers/courses.controllers');
const CoursesSchema = require('../middlewares/courses.middleware');
const express = require('express');
const  verifyToken  = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');

const router = express.Router();


router.route('/')
    .get(verifyToken, allowedTo("Admin" , "User"),CoursesController.getallcourses)
    .post(CoursesSchema ,CoursesController.addcourse);

router.route('/:id')
    .get(CoursesController.getsinglecourse)
    .patch(CoursesController.updatecourse)
    .delete(verifyToken,allowedTo("Admin"),CoursesController.deletecourse)



module.exports = router;