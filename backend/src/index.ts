/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { initDBConnection } from './db/initDBConnection';

const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRouter);

initDBConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server connected on port ${String(PORT)}`);
        }).on('error', (error) => {
            console.error('Failed to start server:', error);
        });
    });
