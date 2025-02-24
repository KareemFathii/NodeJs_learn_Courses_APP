// byakhod el function as a paramter w be return middleware lakn hwa msh middleware 
module.exports =  (fn) => {

    return (req,res,next) =>{
        fn(req,res,next).catch((error)=> next(error));
    }
}