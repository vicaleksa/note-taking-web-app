/* eslint-disable no-console */
import express from 'express';
import dataSource from './data-source';

const PORT = 8000;

const app = express();

dataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server connected on port ${String(PORT)}`);
        });
    });
