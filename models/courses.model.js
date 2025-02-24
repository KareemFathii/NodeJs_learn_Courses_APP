const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true
        },
        price : {
            type: Number,
            required: true
        }
    }
);

const course = mongoose.model('Courses', CoursesSchema);

module.exports = course;