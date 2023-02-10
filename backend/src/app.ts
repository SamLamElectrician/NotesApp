//file for express settings

//for environment keys
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import morgan from 'morgan';
import createHttpError from 'http-errors';

const app = express();
//middle ware for logging information and amount of information printed to console
// prints log of all the end point we access
app.use(morgan('dev'));

//sets up express to accept and send json
app.use(express.json());

//middle ware that goes to notes route
//changes url to api/notes
app.use('/api/notes', notesRoutes);

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
	//checking if the type is error
	if (error instanceof Error) {
		errorMessage = error.message;
		//manually putting json, whereas notes is an array
		res.status(500).json({ error: errorMessage });
	}
});

export default app;
