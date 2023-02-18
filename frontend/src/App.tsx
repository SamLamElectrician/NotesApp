import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Notes';

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
		<div>
			{notes.map((note) => (
				<Note note={note} key={note._id} />
			))}
		</div>
	);
}
//324

export default App;
