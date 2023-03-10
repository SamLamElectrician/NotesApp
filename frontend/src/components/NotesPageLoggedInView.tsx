import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import Note from '../components/Notes';
import { Note as NoteModel } from '../models/note';
import * as NotesApi from '../network/notes_api';
import AddEditNoteDialogue from './AddEditNoteDialogue';
import styles from '../styles/NotePage.module.css';
import styleUtils from '../styles/utils.module.css';

export default function NotesPageLoggedInView() {
	//empty array state
	const [notes, setNotes] = useState<NoteModel[]>([]);
	//steate to show if modal is open or not
	const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
	//checks to see if note is there to edit, null if there isn't
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
	//upon opening apps, notes will be loading in
	const [notesLoading, setNotesLoading] = useState(true);
	//error handle for when loading notes fail
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

	useEffect(() => {
		async function loadNotes() {
			try {
				//error for refresh
				setShowNotesLoadingError(false);
				setNotesLoading(true);
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.log(error);
				setShowNotesLoadingError(true);
			} finally {
				setNotesLoading(false);
			}
		}
		loadNotes();

		//empty array dependency executes one time,
		//no array means executes every render
	}, []);

	//deleting notes with note(interface of Note Model)
	async function deleteNote(note: NoteModel) {
		try {
			//wait for call from front end to backend in network/notes_api.ts
			await NotesApi.deleteNote(note._id);
			//removes notes from list via note id
			setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	const notesGrid = (
		//g-4 from bootstrap docs
		//sizing relative to screen size and how many rows
		<Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
			{notes.map((note) => (
				<Col key={note._id}>
					<Note
						note={note}
						className={styles.note}
						//function to edit note
						onNoteClicked={setNoteToEdit}
						// passing deleteNote function to the note
						onDeleteNoteClicked={deleteNote}
					/>
				</Col>
			))}
		</Row>
	);

	return (
		<>
			<Button
				className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				onClick={() => {
					setShowAddNoteDialog(true);
				}}
			>
				<FaPlus />
				Add New Note
			</Button>
			{/* shows loading if loading is true */}
			{notesLoading && <Spinner animation='border' variant='primary' />}
			{/* shows p tag if notes has an error reaching the api */}
			{showNotesLoadingError && (
				<p>Something went wrong. Please refresh the page.</p>
			)}
			{/* first logical if operator to check if notes are loading and if there is an error otherwise move inwards */}
			{!notesLoading && !showNotesLoadingError && (
				<>
					{/* ternary depending on how many notes you have */}
					{notes.length > 0 ? notesGrid : <p>You don't have any notes yet!</p>}
				</>
			)}

			{/* inline if with logical && operator */}
			{showAddNoteDialog && (
				<AddEditNoteDialogue
					onDismiss={() => {
						setShowAddNoteDialog(false);
					}}
					onNoteSaved={(newNote) => {
						setNotes([...notes, newNote]);
						setShowAddNoteDialog(false);
					}}
				/>
			)}
			{/* note to edit component */}
			{noteToEdit && (
				<AddEditNoteDialogue
					noteToEdit={noteToEdit}
					//resets to null
					onDismiss={() => setNoteToEdit(null)}
					//resets the changer
					onNoteSaved={(updatedNote) => {
						//hides it and resets to note
						setNoteToEdit(null);
						//update the note without calling the api again
						setNotes(
							notes.map((existingNote) =>
								existingNote._id === updatedNote._id
									? updatedNote
									: existingNote
							)
						);
					}}
				/>
			)}
		</>
	);
}
