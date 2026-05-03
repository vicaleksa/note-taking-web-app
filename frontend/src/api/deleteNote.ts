import fetchHelper from '../utils/fetchHelper';
import { ApiNote } from '../types/api';

const deleteNote = (noteId: string): Promise<ApiNote> => fetchHelper(`notes/delete/${noteId}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default deleteNote;
