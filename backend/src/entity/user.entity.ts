import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Note } from './note.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        email: string;

    @Column()
        password: string;

    @CreateDateColumn()
        created_at: Date;

    @OneToMany(() => Note, (note) => note.user)
        notes: Note[];
}
