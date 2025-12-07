import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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
}
