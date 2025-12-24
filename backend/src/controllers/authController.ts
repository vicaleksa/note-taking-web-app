import { Request, Response } from 'express';
import validator from 'validator';

export async function registerUser(req: Request, res: Response) {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    email = email.trim();

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    console.log(req.body)
}
