import express from 'express';
//imports all functions as notesController, saves on space if there are a lot of functions
import * as NotesController from '../controller/notes';

//dont want to create a new server but call back the intial server
const router = express.Router();

router.get('/', NotesController.getNotes);

export default router;
