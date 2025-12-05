import express from 'express';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Note } from './entity/note.entity';
// import notesData from './data.json' with { type: "json" };

const PORT = 8000;

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'admin',
    database: 'test',
    entities: [Note],
    synchronize: true,
    logging: false,
});

const app = express();

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`server connected on port ${String(PORT)}`);
        });
    });

// app.get('/', (req, res) => {
//     res.send(notesData);
// })
