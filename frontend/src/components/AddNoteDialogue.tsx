import { Modal, Form, Button } from 'react-bootstrap';

interface AddNoteDialogueProps {
	onDismiss: () => void;
}

export default function AddNoteDialogue({ onDismiss }: AddNoteDialogueProps) {
	return (
		<div>
			<Modal show onHide={onDismiss}>
				<Modal.Header closeButton>
					<Modal.Title>Add Note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className='mb-3'>
						<Form.Label>Title</Form.Label>
						<Form.Control type='text' placeholder='Title'></Form.Control>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Text</Form.Label>
						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Text'
						></Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button type='submit'>Save</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
