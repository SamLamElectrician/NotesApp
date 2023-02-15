import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Note } from './models/note';

function App() {
	//empty array state
	const [notes, setNotes] = useState<Note[]>([]);

	//executes sideeffects outside render
	useEffect(() => {
		async function loadNotes() {
			try {
				//fetch call to get data
				const response = await fetch('http://localhost:5000/api/notes', {
					method: 'GET',
				});
				const notes = await response.json();
			} catch (error) {
				console.log(error);
				alert(error);
			}
		}
	});

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Samalama</p>
			</header>
		</div>
	);
}
//301

export default App;
