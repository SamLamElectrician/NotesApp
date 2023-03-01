import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

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
		//checks if there is an existing username within the database
		if (existingUsername) {
			throw createHttpError(
				409,
				'Username already taken. Please choose a different one or log in instead.'
			);
		}

		const existingEmail = await UserModel.findOne({ email: email }).exec();

		if (existingEmail) {
			throw createHttpError(
				409,
				'A user with this email address already exists. Please log in instead.'
			);
		}
		//hashing with bcrypt package
		//salthash--> security measure to protect hash
		const passwordHashed = await bcrypt.hash(passwordRaw, 10);

		const newUser = await UserModel.create({
			username: username,
			email: email,
			password: passwordHashed,
		});

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};
