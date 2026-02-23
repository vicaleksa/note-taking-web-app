const logout = async () => {
    try {
        await fetch('http://localhost:8000/api/auth/logout');
        window.location.replace('/login');
    } catch (err) {
        console.error('Failed to log out', err);
    }
};

export default logout;
