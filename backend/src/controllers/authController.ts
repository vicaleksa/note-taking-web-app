import { Request, Response } from 'express';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import dataSource from '../data-source';
import { User } from '../entity/user.entity';

type UserData = {
    email: string,
    password: string,
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export async function registerUser(req: Request<{}, {}, UserData>, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        const userRepository = dataSource.getRepository(User);

        const existingUser = await userRepository.findOne({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User();
        user.email = email;
        user.password = hashedPassword;

        await userRepository.save(user);

        req.session.userId = user.id;

        return res.status(201).json({
            message: 'User registered',
            userId: user.id,
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Registration error:', err.message);
        } else {
            console.error('Registration error:', err);
        }
        return res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export async function loginUser(req: Request<{}, {}, UserData>, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await dataSource.getRepository(User).findOneBy({ email });
        if (!existingUser) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.session.regenerate((err) => {
            if (err) {
                return res.status(500);
            }

            req.session.userId = existingUser.id;

            req.session.save(() => res.status(200).json({
                message: 'Logged in',
            }));
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Login error:', err.message);
        } else {
            console.error('Login error:', err);
        }
        return res.status(500).json({ error: 'Login failed. Please try again.' });
    }
}

export function logoutUser(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err instanceof Error) {
            console.error('Logout error:', err.message);
            return res.status(500).json({ error: 'Logout failed' });
        }

        res.clearCookie('connect.sid');
        return res.json({ message: 'Logged out' });
    });
}
