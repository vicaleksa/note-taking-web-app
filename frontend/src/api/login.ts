type User = {
    email: string,
    password: string,
}

const login = async (user: User) => {
    const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please try again.');
    } else {
        window.location.href = '/';
    }
};

export default login;
