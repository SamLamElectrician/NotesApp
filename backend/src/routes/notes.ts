import express from 'express';
//imports all functions as notesController, saves on space if there are a lot of functions
import * as NotesController from '../controller/notes';

//dont want to create a new server but call back the intial server
const router = express.Router();

router.get('/', NotesController.getNotes);

//get request for specific data refering to id of note
router.get('/:noteId', NotesController.getNote);

//you can use / as they are both different http methods
//different data, use differnt end points
//post request
router.post('/', NotesController.createNotes);

//update a resouce
router.patch('/:noteId', NotesController.updateNote);

//delete a node
router.delete('/:noteId', NotesController.deleteNode);
export default router;
