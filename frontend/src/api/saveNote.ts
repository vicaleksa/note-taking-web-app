import fetchHelper from '../utils/fetchHelper';
import parseTags from '../utils/parseTags';

interface NoteData {
    title: string,
    tags: string,
    content: string,
}

const saveNote = (newNote: NoteData) => fetchHelper('notes/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        ...newNote,
        tags: parseTags(newNote.tags),
    }),
}, 'Note creation failed');

export default saveNote;
