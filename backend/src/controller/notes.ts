import { RequestHandler } from 'express';
import NoteModel from '../models/note';

// async in get request
// ts knows types of req and res due to .get
export const getNotes: RequestHandler = async (req, res, next) => {
	try {
		// awaits the find operation
		// .exec returns a promise
		const notes = await NoteModel.find().exec();
		// set response to 200 --> http for okay
		// .json returns json file
		res.status(200).json(notes);
		// make sure read write is allowed for user
	} catch (error) {
		// middle ware to handle errors(app.use and app.get are middleware)
		next(error);
	}
};

export const createNotes: RequestHandler = async (req, res, next) => {
	//getting data from request
	const title = req.body.title;
	const text = req.body.text;
	try {
		//new node for mongo
		const newNote = await NoteModel.create({
			title: title,
			text: text,
		});
	} catch (error) {
		next(error);
	}
};
