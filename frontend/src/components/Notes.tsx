import styles from '../styles/Note.module.css';
import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';

//typescript interface for the props
interface NoteProps {
	note: NoteModel;
	className?: string;
}

export default function Notes({ note, className }: NoteProps) {
	const { title, text, createdAt, updatedAt } = note;
	return (
		<Card className={`${styles.noteCard} ${className}`}>
			<Card.Body className={styles.cardBody}>
				<Card.Title>{title}</Card.Title>
				<Card.Text className={styles.cardText}>{text}</Card.Text>
			</Card.Body>
			<Card.Footer className='text-muted'>{createdAt}</Card.Footer>
		</Card>
	);
}
