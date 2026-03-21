import fetchHelper from '../utils/fetchHelper';

const logout = () => fetchHelper('auth/logout', {
    method: 'POST',
}, 'Logout failed');

export default logout;
