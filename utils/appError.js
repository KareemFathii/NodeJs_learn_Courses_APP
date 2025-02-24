class ErrorHandler extends Error {
    constructor(){
        super();
    }

    createError(statusCode , message, statusText){
        this.statusCode = statusCode;
        this.message = message;
        this.statusText = statusText;
        return this;

    }
}

module.exports = new ErrorHandler();