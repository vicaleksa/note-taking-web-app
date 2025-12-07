import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Note } from './entity/note.entity';

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'notes',
    entities: [Note],
    synchronize: true,
    logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
