import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        title: string;

    @Column()
        content: string;

    @UpdateDateColumn()
        lastEdited: Date;

    @Column()
        isArchived: boolean;

    @ManyToMany(() => Tag, (tag) => tag.notes, { onDelete: 'CASCADE' })
    @JoinTable()
        tags: Tag[];

    @ManyToOne(() => User, (user) => user.notes)
        user: User;
}
