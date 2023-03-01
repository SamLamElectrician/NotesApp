import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
	const authenticatedUserId = req.session.userId;
	try {
		if (!authenticatedUserId) {
			throw createHttpError(401, 'User not authenticated');
		}
		const user = await UserModel.findById(authenticatedUserId)
			.select('+email')
			.exec();
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

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
		// checks if there is an existing username within the database
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

		//adds a session using express-sessions package to have a session to login
		//stores data using mongo-connect package
		//userId not known in typescript so you need to make a type
		req.session.userId = newUser._id;

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

interface LoginBody {
	username?: string;
	password?: string;
}

export const login: RequestHandler<
	unknown,
	unknown,
	LoginBody,
	unknown
> = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	try {
		//error handling for checking parameters
		if (!username || !password) {
			throw createHttpError(400, 'Parameters Missing');
		}
		//check for user
		//select sends back email and password due to default not returning both
		const user = await UserModel.findOne({ username: username })
			.select('+password +email')
			.exec();

		//if no user, throws error
		//general string to prevent hacker if there is an account or not
		if (!user) {
			throw createHttpError(401, 'Invalid credentials');
		}

		//if found user
		//bcrypt will compare hash password to string
		const passwordMatch = await bcrypt.compare(password, user.password);

		//checking password match
		if (!passwordMatch) {
			throw createHttpError(401, 'Invalid credentials');
		}
		//because user/email and password match database we can init a session
		req.session.userId = user._id;
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

//controlling log out feature
export const logOut: RequestHandler = (req, res, next) => [
	//since destroy is not a promise you need a call baack
	//this is the function to destroy the session
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			//since we dont send a json body we need to sendStatus instead of status
			res.sendStatus(200);
		}
	}),
];
