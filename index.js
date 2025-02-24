require("dotenv").config();
var cors = require('cors')
const express = require('express');
const app = express();
const coursesRouter = require('./routes/courses.routes');
const usersRouter = require('./routes/users.routes');
const mongoose = require('mongoose');
const url = process.env.Mongo_URL
const httpstatustext = require("./utils/httpStatusText");
const path = require("path");

mongoose.connect(url).then(() => {
   console.log('Coonnected to MongoDB successfully');
})
app.use(cors());

// h3ml el roots bt3t el api 
//say 3ndna data object 
// middleware used to make bodyparser to the req.body as it contains middleware bodyparser inside express.json()
app.use(express.json());
app.use('/api/courses', coursesRouter);
app.use("/uploads",express.static(path.join(__dirname, "uploads")));

app.use("/api/users",usersRouter);
//global route error handler
app.all("*",(req , res,next) => {
   res.status(404).json({status:httpstatustext.ERROR , message: "this resource is not available"});
})
 // global error handler
app.use((error,req, res, next) => {
res.status(error.statusCode||500).json({status:error.statusText|| httpstatustext.ERROR , message: error.message});
})

app.listen(process.env.PORT || 5000, () => {
   console.log('listening on port 5000'); 
});