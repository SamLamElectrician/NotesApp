import { Modal, ModalBody, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { LoginCredentials } from '../network/notes_api';
import TextInputField from './form/TextInputField';
import * as NotesApi from '../network/notes_api';
import styleUtils from '../styles/utils.module.css';
import { useState } from 'react';

interface LoginModalProps {
	onDismiss: () => void;
	onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
	const [errorText, setErrorText] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginCredentials>();

	async function onSubmit(credentials: LoginCredentials) {
		try {
			const user = await NotesApi.login(credentials);
			onLoginSuccessful(user);
		} catch (error) {
			alert(error);
			console.error(error);
		}
	}
	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<ModalBody>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<TextInputField
						name='username'
						label='Username'
						type='text'
						placeholder='Username'
						register={register}
						registerOptions={{ required: 'Required' }}
						error={errors.username}
					/>
					<TextInputField
						name='password'
						label='Password'
						type='password'
						placeholder='Password'
						register={register}
						registerOptions={{ required: 'Required' }}
						error={errors.password}
					/>
					<Button
						type='submit'
						disabled={isSubmitting}
						className={styleUtils.width100}
					>
						Log In
					</Button>
				</Form>
			</ModalBody>
		</Modal>
	);
};

export default LoginModal;
