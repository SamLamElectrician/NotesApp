//error is a class
class HttpError extends Error {
	constructor(message?: string) {
		super(message);
		//puts in name field of error class
		this.name = this.constructor.name;
	}
}

//takes the properties of httpError
/**
 * Status Code: 401
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status Code: 409
 */
export class ConflictError extends HttpError {}

//Add more error classes if you need distinction
