import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
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

export const getNote: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId;

	try {
		//finding node by note ID
		const note = await NoteModel.findById(noteId).exec();

		if (!note) {
			throw createHttpError(404, 'Note not found!');
		}
		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};

//different between types, more flexible than types
interface CreateNoteBody {
	//reason becasue it might be missing from request
	title?: string;
	// ? means might be optional
	text?: string;
}

// angle brackets are for type assertion
// takes four arguements
export const createNotes: RequestHandler<
	unknown,
	unknown,
	CreateNoteBody,
	unknown
> = async (req, res, next) => {
	//getting data from request
	const title = req.body.title;
	const text = req.body.text;
	try {
		if (!title) {
			//from http status code
			//400 is bad request in case of missing argument in request
			throw createHttpError(400, 'Note must have a title');
			//throw automatically leaves try and goes to catch block
		}
		//new node for mongo
		const newNote = await NoteModel.create({
			title: title,
			text: text,
		});
		//201 is for new resource created
		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};
