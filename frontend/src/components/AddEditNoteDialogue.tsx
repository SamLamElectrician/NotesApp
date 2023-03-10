import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Note } from '../models/note';
import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import TextInputField from './form/TextInputField';

interface AddEditNoteDialogueProps {
	//optional argument to edit note
	noteToEdit?: Note;
	onDismiss: () => void;
	onNoteSaved: (note: Note) => void;
}

//edit or add note function
export default function AddEditNoteDialogue({
	noteToEdit,
	onDismiss,
	onNoteSaved,
}: AddEditNoteDialogueProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<NoteInput>({
		//define default values --> changes based on what note to edit or adding note
		defaultValues: {
			title: noteToEdit?.title || '',
			text: noteToEdit?.text || '',
		},
	});

	//handles the submit of form
	async function onSubmit(input: NoteInput) {
		try {
			//not initialized yet
			let noteResponse: Note;
			//if notetoEdit is true, update a note
			if (noteToEdit) {
				noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
				//if noteToEdit doesn't exist, create a note to put in
			} else {
				noteResponse = await NotesApi.createNote(input);
			}
			onNoteSaved(noteResponse);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	return (
		<div>
			<Modal show onHide={onDismiss}>
				<Modal.Header closeButton>
					<Modal.Title>
						{
							//if noteToEdit note exist than use edit note if not use add note
							noteToEdit ? 'Edit Note' : 'Add Note'
						}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
						<TextInputField
							name='title'
							label='Title'
							type='text'
							placeholder='Title'
							register={register}
							registerOptions={{ required: 'Required' }}
							error={errors.title}
						/>
						<TextInputField
							name='text'
							label='Text'
							as='textarea'
							row={5}
							placeholder='Text'
							register={register}
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button type='submit' form='addEditNoteForm' disabled={isSubmitting}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
