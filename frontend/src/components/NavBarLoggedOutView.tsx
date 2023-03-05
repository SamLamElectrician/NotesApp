import { Button, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import * as NotesApi from '../network/notes_api';

interface NavBarLoggedOutViewProps {
	onSignUpClicked: () => void;
	onLoginClicked: () => void;
}

export default function NavBarLoggedInView({
	onSignUpClicked,
	onLoginClicked,
}: NavBarLoggedOutViewProps) {
	return (
		<>
			<Button onClick={onSignUpClicked}>Sign Up</Button>
			<Button onClick={onLoginClicked}>Login</Button>
		</>
	);
}
