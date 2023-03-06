import { Container } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
function App() {
	//checks if user is logged in following user interface or null
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	//controls sign up
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	//controls login
	const [showLoginpModal, setLoginModal] = useState(false);

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await NotesApi.getLoggedInUser();
				//if there is a user than it will update the use State
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
	});

	return (
		<div>
			<NavBar
				loggedInUser={loggedInUser}
				onLoginClicked={() => setLoginModal(true)}
				onSignUpClicked={() => setShowSignUpModal(true)}
				onLogoutSuccessful={() => setLoggedInUser(null)}
			></NavBar>
			<Container className={styles.notesPage}>
				{false && (
					<SignUpModal onDismiss={() => {}} onSignUpSuccessful={() => {}} />
				)}
				{false && (
					<LoginModal onDismiss={() => {}} onLoginSuccessful={() => {}} />
				)}
			</Container>
		</div>
	);
}

export default App;
