import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Notes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import styleUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import AddEditNoteDialogue from './components/AddEditNoteDialogue';
//plus icon
import { FaPlus } from 'react-icons/fa';

function App() {
	//empty array state
	const [notes, setNotes] = useState<NoteModel[]>([]);
	//steate to show if modal is open or not
	const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
	//checks to see if note is there to edit, null if there isn't
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
	//upon opening apps, notes will be loading in
	const [notesLoading, setNotesLoading] = useState(true);

	//executes sideeffects outside render
	useEffect(() => {
		async function loadNotes() {
			try {
				const notes = await NotesApi.fetchNotes();
				setNotes(notes);
			} catch (error) {
				console.log(error);
				alert(error);
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

	return (
		<Container>
			<Button
				className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				onClick={() => {
					setShowAddNoteDialog(true);
				}}
			>
				<FaPlus />
				Add New Note
			</Button>
			{/* sizing relative to screen size and how many rows */}
			{/* g-4 from bootstrap docs */}
			<Row xs={1} md={2} xl={3} className='g-4'>
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
		</Container>
	);
}

export default App;
