import styles from '../styles/Note.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formateDate';
//delete button import
import { MdDelete } from 'react-icons/md';
import stylesUtils from '../styles/utils.module.css';

//typescript interface for the props
interface NoteProps {
	note: NoteModel;
	//forwards to the function
	onNoteClicked: (note: NoteModel) => void;
	//this call back to delete it, will not return anything after deleting note
	onDeleteNoteClicked: (note: NoteModel) => void;
	className?: string;
}

export default function Notes({
	note,
	//call for add or edit
	onNoteClicked,
	//call for delete
	onDeleteNoteClicked,
	className,
}: NoteProps) {
	const { title, text, createdAt, updatedAt } = note;
	let createdUpdatedText: string;
	if (updatedAt > createdAt) {
		createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
	} else {
		createdUpdatedText = 'Created: ' + formatDate(createdAt);
	}
	return (
		<Card
			className={`${styles.noteCard} ${className}`}
			// onclick --> forwards note to function
			onClick={() => onNoteClicked(note)}
		>
			<Card.Body className={styles.cardBody}>
				{/* adding a flex box to the title */}
				<Card.Title className={stylesUtils.flexCenter}>
					{title}
					{/* MD delete is a garbage can */}
					<MdDelete
						//text-muted greys the icon, ms-auto auto alligns it
						className='text-muted ms-auto'
						onClick={(e) => {
							//calls the delete function on the note
							onDeleteNoteClicked(note);
							//allows click to go through
							e.stopPropagation();
						}}
					></MdDelete>
				</Card.Title>
				<Card.Text className={styles.cardText}>{text}</Card.Text>
			</Card.Body>
			<Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
		</Card>
	);
}
