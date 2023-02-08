//file for express settings

//for environment keys
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import NoteModel from './models/node';

const app = express();

//async in get request
//ts knows types of req and res due to .get
app.get('/', async (req, res) => {
	try {
		throw Error('Bazinga!');
		//awaits the find operation
		//.exec returns a promise
		const notes = await NoteModel.find().exec();
		//set response to 200 --> http for okay
		//.json returns json file
		res.status(200).json(notes);
		//make sure read write is allowed for user
	} catch (error) {
		console.error;
	}
});

// error handler kick in automatically, below normal endpoint
// takes very specific argument, error,
// set type here because .use type can be anything
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
