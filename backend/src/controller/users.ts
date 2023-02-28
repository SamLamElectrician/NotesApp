import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';

interface SignUpBody {
	username?: string;
	email?: string;
	password?: string;
}

export const signUp: RequestHandler<
	unknown,
	unknown,
	SignUpBody,
	unknown
> = async (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const passwordRaw = req.body.password;

	try {
		//error handling to check if any value is missing
		if (!username || !email || !passwordRaw) {
			//throws error if missing
			throw createHttpError(400, 'Parameters missing');
		}
		//searching database for username that fits username variable
		const existingUsername = await UserModel.findOne({
			username: username,
		}).exec();
	} catch (error) {
		next(error);
	}
};
