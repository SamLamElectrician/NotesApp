import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Notes';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import * as NotesApi from './network/notes_api';
import AddNoteDialogue from './components/AddNoteDialogue';

function App() {
	//empty array state
	const [notes, setNotes] = useState<NoteModel[]>([]);
	//steate to show if modal is open or not
	const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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

	return (
		<Container>
			{/* sizing relative to screen size and how many rows */}
			{/* g-4 from bootstrap docs */}
			<Row xs={1} md={2} xl={3} className='g-4'>
				{notes.map((note) => (
					<Col key={note._id}>
						<Note note={note} className={styles.note} />
					</Col>
				))}
			</Row>
			{/* inline if with logical && operator */}
			{showAddNoteDialog && <AddNoteDialogue />}
		</Container>
	);
}
//324

export default App;
