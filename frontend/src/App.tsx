import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Notes';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
	//empty array state
	const [notes, setNotes] = useState<NoteModel[]>([]);

	//executes sideeffects outside render
	useEffect(() => {
		async function loadNotes() {
			try {
				//fetch call to get data from back end
				//added a proxy in package json for dev
				const response = await fetch('/api/notes', {
					method: 'GET',
				});
				const notes = await response.json();
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
						<Note note={note} />
					</Col>
				))}
			</Row>
		</Container>
	);
}
//324

export default App;
