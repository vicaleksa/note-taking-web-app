import fetchHelper from '../utils/fetchHelper';
import parseTags from '../utils/parseTags';
import { FormDataType } from '../types';

const saveNote = (newNote: FormDataType) => fetchHelper('notes/add', {
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
