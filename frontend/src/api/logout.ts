import fetchHelper from '../utils/fetchHelper';

const logout = () => fetchHelper('auth/logout', {
    method: 'POST',
    credentials: 'include',
}, 'Logout failed');

export default logout;
