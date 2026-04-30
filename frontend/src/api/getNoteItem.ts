import fetchHelper from '../utils/fetchHelper';
import { ApiNote } from '../types/api';

const getNoteItem = (noteId: string): Promise<ApiNote> => fetchHelper(`notes/${noteId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default getNoteItem;
