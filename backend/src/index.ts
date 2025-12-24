/* eslint-disable no-console */
import express from 'express';
import dataSource from './data-source';
import { authRouter } from './routes/auth';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRouter);

dataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server connected on port ${String(PORT)}`);
        });
    });
