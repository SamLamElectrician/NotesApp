import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import NoteModel from '../models/note';

// async in get request
// ts knows types of req and res due to .get
//function to get all notes
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

// function handler to get note by id
export const getNote: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId;

	try {
		//checks if note ID follows scheme, returns true if follows, return false otherwise
		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, 'invalid note ID');
		}

		//finding node by note ID
		//no format needed for noteID
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
//function to create notes
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

interface UpdateNoteParams {
	noteId: string;
}

interface UpdateNoteBody {
	title?: string;
	text?: string;
}

//updating notes
export const updateNote: RequestHandler<
	UpdateNoteParams,
	unknown,
	UpdateNoteBody,
	unknown
> = async (req, res, next) => {
	const noteId = req.params.noteId;
	const newTitle = req.body.title;
	const newText = req.body.text;
	try {
		//checks if noteId is valid
		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, 'invalid note ID');
		}
		if (!newTitle) {
			//from http status code
			//400 is bad request in case of missing argument in request
			throw createHttpError(400, 'Note must have a title');
		}
		//finding note by id
		const note = await NoteModel.findById(noteId).exec();
		//checks to see the note is valid
		if (!note) {
			throw createHttpError(404, 'Note not found!');
		}
		//sets note as new title and new text
		note.title = newTitle;
		note.text = newText;
		//gets new note
		const updatedNote = await note.save();
		res.status(200).json(updatedNote);
	} catch (error) {
		next(error);
	}
};

//no body so typescript doesnt need interface, default params
export const deleteNode: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId;
	try {
		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, 'invalid note ID');
		}
		const note = await NoteModel.findById(noteId).exec();
		if (!note) {
			throw createHttpError(404, 'Note not found!');
		}
		await note.remove();
		//deletion sucessful
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
//left at 2:33
