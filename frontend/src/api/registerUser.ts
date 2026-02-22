type User = {
    email: string,
    password: string,
}

const registerUser = async (newUser: User) => {
    const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
    }
};

export default registerUser;
