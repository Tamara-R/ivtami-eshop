class ErrorHandler extends Error {

	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor); //objekat i konstruktor objekta
	}
}

module.exports = ErrorHandler;