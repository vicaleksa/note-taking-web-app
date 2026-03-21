import fetchHelper from '../utils/fetchHelper';

type User = {
    email: string,
    password: string,
}

const login = (user: User) => fetchHelper('auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
}, 'Login failed. Please try again.');

export default login;
