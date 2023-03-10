//file for express settings

//for environment keys
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import userRoutes from './routes/user';
import session from 'express-session';
import env from './utility/validateEnv';
import MongoStore from 'connect-mongo';
import { requiresAuth } from './middleware/auth';

const app = express();
//middle ware for logging information and amount of information printed to console
// prints log of all the end point we access
app.use(morgan('dev'));

//sets up express to accept and send json
app.use(express.json());

//express session needs to be after json body but before routes
app.use(
	session({
		//stored session secret in env so its not hardcoded
		secret: env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			//how long they can use it for
			maxAge: 60 * 60 * 1000,
		},
		//user stays login as log as they are using the website
		rolling: true,
		//where session data will be stored
		store: MongoStore.create({
			mongoUrl: env.MONGO_CONNECTION_STRING,
		}),
	})
);
//middle ware that goes to notes route
//changes url to api/notes
app.use('/api/notes', requiresAuth, notesRoutes);

//routes for user
//require auth checks for user
app.use('/api/users', userRoutes);

// only typing for errors
// error handling for unknown endpoint
app.use((req, res, next) => {
	//create an error that sends back this string
	//two arguments, http status code and error message
	next(createHttpError(404, 'Endpoint not found'));
});

// error handler kick in automatically, below normal endpoint
// takes very specific argument, error,
// set type here because .use type can be anything
// ignore the fix for next
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error;
	let errorMessage = 'An unknown error occured';
	//defaulted to 500
	let statusCode = 500;
	//checking if the type is error of http package
	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
		//manually putting json, whereas notes is an array
	}
	//imperativly programing status code
	res.status(statusCode).json({ error: errorMessage });
});

export default app;

//left at 2:07
