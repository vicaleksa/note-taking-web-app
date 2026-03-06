import fetchHelper from '../utils/fetchHelper';

type User = {
    email: string,
    password: string,
}

const registerUser = (newUser: User) => fetchHelper('auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
}, 'Registration failed');

export default registerUser;
