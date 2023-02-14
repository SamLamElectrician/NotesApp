import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Note } from './models/note';

function App() {
	const [notes, setNotes] = useState<Note[]>([]);
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Samalama</p>
			</header>
		</div>
	);
}

export default App;
