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

    return res.status(201).json({
        message: 'User registered',
        userId: user.id,
    });
}
