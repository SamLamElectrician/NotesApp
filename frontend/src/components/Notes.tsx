import styles from '../styles/Note.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formatDate } from '../utils/formateDate';
import { MdDelete } from 'react-icons/md';
import stylesUtils from '../styles/utils.module.css';

//typescript interface for the props
interface NoteProps {
	note: NoteModel;
	onDeleteNoteClicked: (note: NoteModel) => void;
	className?: string;
}

export default function Notes({
	note,
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
		<Card className={`${styles.noteCard} ${className}`}>
			<Card.Body className={styles.cardBody}>
				<Card.Title className={stylesUtils.flexCenter}>
					{title}
					<MdDelete
						className='text-muted ms-auto'
						onClick={(e) => {
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
