import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { SignUpCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Form, Modal, Button, Alert } from 'react-bootstrap';
import TextInputField from './form/TextInputField';
import styleUtils from '../styles/utils.module.css';
import { useState } from 'react';
import { ConflictError } from '../errors/htttp_errors';

interface SignUpModalProps {
	onDismiss: () => void;
	onSignUpSuccessful: (user: User) => void;
}

export default function SignUpModal({
	onDismiss,
	onSignUpSuccessful,
}: SignUpModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpCredentials>();

	const [errorText, setErrorText] = useState<string | null>(null);

	async function onSubmit(credentials: SignUpCredentials) {
		try {
			const newUser = await NotesApi.signUp(credentials);
			onSignUpSuccessful(newUser);
		} catch (error) {
			if (error instanceof ConflictError) {
				setErrorText(error.message);
			} else {
				alert(error);
			}
			console.error(error);
		}
	}
	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header>
				<Modal.Title>Sign Up</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errorText && <Alert variant='danger'> {errorText}</Alert>}
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
						name='email'
						label='Email'
						type='email'
						placeholder='Email'
						register={register}
						registerOptions={{ required: 'Required' }}
						error={errors.email}
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
						Sign Up
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
