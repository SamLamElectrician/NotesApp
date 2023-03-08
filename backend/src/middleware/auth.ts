//middleware is a req handler

import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

export const requiresAuth: RequestHandler = (req, res, next) => {
	//checks to see if user is logged into the middleware
	if (req.session.userId) {
		//calls the next middle ware if they are logged in
		next();
	} else {
		//creates an error if not logged in
		next(createHttpError(401, 'User not authenticated'));
	}
};
