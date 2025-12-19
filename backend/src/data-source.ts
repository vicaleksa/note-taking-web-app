import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Note } from './entity/note.entity';
import { User } from './entity/user.entity';

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'notes',
    entities: [User, Note],
    synchronize: true,
    logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
