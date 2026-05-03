import fetchHelper from '../utils/fetchHelper';
import { ApiNote } from '../types/api';

const archiveNote = (noteId: string): Promise<ApiNote> => fetchHelper(`notes/archive/${noteId}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default archiveNote;
