class CustomApiError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

const createCustomError = (statusCode, msg) => {
	return new CustomApiError(statusCode, msg);
}

module.exports = { createCustomError, CustomApiError };
