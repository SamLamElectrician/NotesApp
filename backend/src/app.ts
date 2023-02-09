//file for express settings

//for environment keys
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';

const app = express();

// only typing for errors
// error handling for unknown endpoint
app.use((req, res, next) => {
	//create an error that sends back this string
	next(Error('Endpoint not found'));
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
