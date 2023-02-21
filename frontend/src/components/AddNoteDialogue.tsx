import { Modal } from 'react-bootstrap';

export default function AddNoteDialogue() {
	return (
		<div>
			<Modal show>
				<Modal.Header closeButton>
					<Modal.Title>Add Note</Modal.Title>
				</Modal.Header>
			</Modal>
		</div>
	);
}
