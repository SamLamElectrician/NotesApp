import React, { useEffect, useState } from 'react';
import './App.css';
import { Note } from './models/note';

function App() {
	//empty array state
	const [notes, setNotes] = useState<Note[]>([]);

	//executes sideeffects outside render
	useEffect(() => {
		async function loadNotes() {
			try {
				//fetch call to get data from back end
				const response = await fetch('http://localhost:5000/api/notes', {
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

	return <div className='App'>{JSON.stringify(notes)}</div>;
}
//301

export default App;
