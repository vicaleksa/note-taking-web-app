import { Note } from '../types';

const getNotesFromStorage = () => {
    const notes: Array<Note> = localStorage.getItem('notes') === null
        ? []
        : JSON.parse(localStorage.getItem('notes') as string) as Array<Note>;
    return notes;
};

export default getNotesFromStorage;
