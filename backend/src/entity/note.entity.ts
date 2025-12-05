import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        title: string;

    @Column()
        tags: string[];

    @Column()
        content: string;

    @Column()
        lastEdited: Date;

    @Column()
        isArchived: boolean;
}
