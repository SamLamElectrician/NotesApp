import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';

interface NavBarProps {
	loggedInUser?: User | null;
	onSignUpClicked: () => void;
	onLoginClicked: () => void;
	onLogoutSuccessful: () => void;
}

export default function NavBar({
	loggedInUser,
	onSignUpClicked,
	onLoginClicked,
	onLogoutSuccessful,
}: NavBarProps) {
	return (
		<Navbar bg='primary' variant='dark' expand='lg' sticky='top'>
			<Container>
				<Navbar.Brand>Cool Notes App</Navbar.Brand>
				<Navbar.Toggle aria-controls='sm-navbar'></Navbar.Toggle>
				<Navbar.Collapse id='main-navbar'>
					<Nav className='ms-auto'>
						{loggedInUser ? (
							<NavBarLoggedInView
								user={loggedInUser}
								onLogoutSuccessful={onLogoutSuccessful}
							/>
						) : (
							<NavBarLoggedOutView
								onLoginClicked={onLoginClicked}
								onSignUpClicked={onSignUpClicked}
							/>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
