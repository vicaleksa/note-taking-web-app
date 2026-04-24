import fetchHelper from '../utils/fetchHelper';

const getNoteItem = (noteId:string) => fetchHelper(`notes/${noteId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default getNoteItem;
