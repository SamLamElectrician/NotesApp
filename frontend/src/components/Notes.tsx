import { Card } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';

//typescript interface for the props
interface NoteProps {
	note: NoteModel;
}

export default function Notes({ note }: NoteProps) {
	return (
		<Card>
			<Card.Body>
				<Card.Title>{note.title}</Card.Title>
			</Card.Body>
		</Card>
	);
}
