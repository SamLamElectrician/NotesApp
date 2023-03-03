import { Modal, ModalBody } from 'react-bootstrap';
import { User } from '../models/user';
import TextInputField from './form/TextInputField';

interface LoginModalProps {
	onDismiss: () => void;
	onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
	return (
		<Modal>
			<Modal.Header>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<ModalBody>
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
				></Button>
			</ModalBody>
		</Modal>
	);
};

export default LoginModal;
