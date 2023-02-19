import styles from '../styles/Note.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';

//typescript interface for the props
interface NoteProps {
	note: NoteModel;
}

export default function Notes({ note }: NoteProps) {
	const { title, text, createdAt, updatedAt } = note;
	return (
		<Card className={styles.noteCard}>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text className={styles.cardText}>{text}</Card.Text>
			</Card.Body>
		</Card>
	);
}
