import fetchHelper from '../utils/fetchHelper';
import { ApiNote, UpdatedNoteData } from '../types/api';
import parseTags from '../utils/parseTags';

// eslint-disable-next-line max-len
const updateNote = (updatedNote: UpdatedNoteData): Promise<ApiNote> => fetchHelper(`notes/update/${updatedNote.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        ...updatedNote.submitData,
        tags: parseTags(updatedNote.submitData.tags),
    }),
}, 'Note update failed');

export default updateNote;
