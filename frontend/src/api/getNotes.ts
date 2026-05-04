import fetchHelper from '../utils/fetchHelper';
import { ApiNotes } from '../types/api';

const getNotes = (): Promise<ApiNotes> => fetchHelper('notes/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default getNotes;
