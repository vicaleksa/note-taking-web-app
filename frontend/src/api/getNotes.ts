import fetchHelper from '../utils/fetchHelper';

const getNotes = () => fetchHelper('notes/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default getNotes;
