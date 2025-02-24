const Courses = require("../models/courses.model");
const  {validationResult} = require ('express-validator');
const ResponseStatus  = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const errorhandler  = require("../utils/appError");


const getallcourses = async (req, res) => {
    
        const query =req.query ;
        const limit  = query.limit || 10 ;
        const page = query.page || 1;
        const skip = (page-1) * limit
        const courses = await Courses.find({},{__v :false}).limit(limit).skip(skip);
        res.json({"status": ResponseStatus.SUCCESS, "data": {courses}});
}
const getsinglecourse = asyncWrapper( async (req, res,next) => {
   
        const course_id = req.params.id;
        const course = await Courses.findOne({_id: course_id});
        if(!course) {
           const error = errorhandler.createError(404, "The course with the given ID was not found" , ResponseStatus.FAIL );
           return next(error);
        }
        res.json({"status": ResponseStatus.SUCCESS , "data": {course}});
    }
) 
const addcourse = asyncWrapper( async (req, res,next) => {
    
        const course = req.body;
        const errors = validationResult(req); // da bykon array by7ot feh el errors lo f 
        if (!errors.isEmpty()) {
            const error = errorhandler.createError(400,errors.array(), ResponseStatus.FAIL );
            return next(error);
        }
        const NewCourse = await new Courses(course);
        await NewCourse.save();
        res.json({"status": ResponseStatus.SUCCESS , "data": {"AddedCourse":NewCourse}});
    }
)
const updatecourse = asyncWrapper( async (req, res,next) => {
    const course_id =req.params.id;
    const coursedata = req.body;
    const course = await Courses.updateOne({_id :course_id}, {$set:{...coursedata}});
    res.json({"status": ResponseStatus.SUCCESS , "data": {course}});
    }
)

const deletecourse = asyncWrapper(async (req, res,next) => {
   
        const course_id =req.params.id;
        const Deleted_course = await Courses.deleteOne({_id: course_id}) ;
        if(Deleted_course.deletedCount === 0) {
            const error = errorhandler.createError(404, "The course with the given ID was not found" , ResponseStatus.FAIL );
            return next(error);
        }
        res.json({"status": ResponseStatus.SUCCESS , "data": "null"});
    }
)

module.exports = {
    getallcourses,
    getsinglecourse,
    addcourse,
    updatecourse,
    deletecourse,  
 };