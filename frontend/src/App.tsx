import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Notes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import styleUtils from './styles/utils.module.css';
import * as NotesApi from './network/notes_api';
import AddEditNoteDialogue from './components/AddEditNoteDialogue';
import { FaPlus } from 'react-icons/fa';

function App() {
	//empty array state
	const [notes, setNotes] = useState<NoteModel[]>([]);
	//steate to show if modal is open or not
	const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

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

	async function deleteNote(note: NoteModel) {
		try {
			await NotesApi.deleteNote(note._id);
			//removes notes from list
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
							onNoteClicked={setNoteToEdit}
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
			{noteToEdit && (
				<AddEditNoteDialogue
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(updatedNote) => {
						setNoteToEdit(null);
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

///442
