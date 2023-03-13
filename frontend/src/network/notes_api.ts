import { ConflictError, UnauthorizedError } from '../errors/htttp_errors';
import { Note } from '../models/note';
import { User } from '../models/user';

//params from fetch call
async function fetchData(input: RequestInfo, init?: RequestInit) {
	const response = await fetch(input, init);
	//between 2-300 =ok
	if (response.ok) {
		return response;
	} else {
		const errorBody = await response.json();
		const errorMessage = errorBody.error;
		if (response.status === 401) {
			throw new UnauthorizedError(errorMessage);
		} else if (response.status === 409) {
			throw new ConflictError(errorMessage);
		} else {
			throw Error(
				'Request failed with status: ' +
					response.status +
					' message: ' +
					errorMessage
			);
		}
	}
}

//return logged in user as a promise
export async function getLoggedInUser(): Promise<User> {
	const response = await fetchData('/api/users', { method: 'GET' });
	return response.json();
}

export interface SignUpCredentials {
	username: string;
	email: string;
	password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
	const response = await fetchData('/api/users/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	return response.json();
}

//login interface
//only using username and password
export interface LoginCredentials {
	username: string;
	password: string;
}

//login
export async function login(credentials: LoginCredentials): Promise<User> {
	const response = await fetchData('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	return response.json();
}

//logout function
//takes no arguments
export async function logout() {
	await fetchData('/api/users/logout', { method: 'POST' });
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
	//fetches the data by note ID and deletes it
	await fetchData('/api/notes/' + noteId, { method: 'DELETE' });
}

//updating note
export async function updateNote(
	//taking ID to find the note and note input of title/text
	//returns a promise of note
	noteId: string,
	note: NoteInput
): Promise<Note> {
	//waits for the api data based on note ID, patches it
	const response = await fetchData('/api/notes/' + noteId, {
		method: 'PATCH',
		//sending json data
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	});
	return response.json();
}
