import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import { SignUpCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';

interface SignUpModalProps {
	onDismiss: () => void;
	onSignUpSucessful: (user: User) => void;
}

export default function SignUpModal({
	onDismiss,
	onSignUpSucessful,
}: SignUpModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpCredentials>();

	async function onSubmit(credentials: SignUpCredentials) {
		try {
			const newUser = await NotesApi.signUp(credentials);
			onSignUpSucessful(newUser);
		} catch (error) {
			alert(error);
			console.error(error);
		}
	}
	return <div></div>;
}
