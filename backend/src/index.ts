/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { initDBConnection } from './db/initDBConnection';
import { authRouter } from './routes/auth';
import { notesRouter } from './routes/notes';

dotenv.config();

declare module 'express-session' {
    interface SessionData {
        userId: number;
    }
}

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
});

const app = express();
const PORT = 8000;

let secret: string;
if (process.env.SPIRAL_SESSION_SECRET) {
    secret = process.env.SPIRAL_SESSION_SECRET;
} else {
    throw new Error('SPIRAL_SESSION_SECRET variable is not set');
}

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret,
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    },
}));

app.use('/api/notes', notesRouter);
app.use('/api/auth', authRouter);

initDBConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server connected on port ${String(PORT)}`);
        }).on('error', (error) => {
            console.error('Failed to start server:', error);
        });
    });
