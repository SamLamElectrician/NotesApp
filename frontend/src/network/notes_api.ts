import { Note } from '../models/note';

//params from fetch call
async function fetchData(input: RequestInfo, init?: RequestInit) {
	const response = await fetch(input, init);
	//between 2-300 =ok
	if (response.ok) {
		return response;
	} else {
		const errorBody = await response.json();
		const errorMessage = errorBody.error;
		throw Error(errorMessage);
	}
}

//returns promise note array
//function that is async, return type automatically a promise
export async function fetchNotes(): Promise<Note[]> {
	//fetch call to get data from back end
	//added a proxy in package json for dev
	const response = await fetch('/api/notes', {
		method: 'GET',
	});
	return response.json();
}

export interface NoteInput {
	title: string;
	text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
	const response = await fetchData('/api/notes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	});
	return response.json();
}

//deleting node from frotn end
export async function deleteNote(noteId: string) {
	await fetchData('/api/notes/' + noteId, { method: 'DELETE' });
}
