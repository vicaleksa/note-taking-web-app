import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        title: string;

    @Column('simple-array')
        tags: string[];

    @Column()
        content: string;

    @UpdateDateColumn()
        lastEdited: Date;

    @Column()
        isArchived: boolean;

    @ManyToOne(() => User, (user) => user.notes)
        user: User;
}
