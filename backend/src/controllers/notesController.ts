import { Request, Response } from 'express';
import dataSource from '../data-source';
import { Note } from '../entity/note.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';

interface NoteData {
    title: string,
    tags: string[],
    content: string,
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export async function saveNotes(req: Request<{}, {}, NoteData>, res: Response) {
    const {
        title,
        tags,
        content,
    } = req.body;

    try {
        const noteRepository = dataSource.getRepository(Note);
        const tagRepository = dataSource.getRepository(Tag);
        const userRepository = dataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { id: req.session.userId },
        });

        const tagEntities = await Promise.all(tags.map(async (tagName) => {
            let tag = await tagRepository.findOne({
                where: { name: tagName },
            });

            if (!tag) {
                tag = tagRepository.create({ name: tagName });
                await tagRepository.save(tag);
            }
            return tag;
        }));

        const note = new Note();
        note.title = title;
        note.tags = tagEntities;
        note.content = content;
        note.isArchived = false;
        if (user) {
            note.user = user;
        }

        await noteRepository.save(note);

        return res.status(201).json({
            message: 'Note created',
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Note creation error:', err.message);
        } else {
            console.error('Note creation error:', err);
        }
        return res.status(500).json({ error: 'Note creation failed. Please try again.' });
    }
}

export async function getAllNotes(req: Request, res: Response) {
    if (!req.session.userId) {
        return res.json({ error: 'not logged in' });
    }

    try {
        const userRepository = dataSource.getRepository(User);
        const noteRepository = dataSource.getRepository(Note);

        const user = await userRepository.findOne({
            where: { id: req.session.userId },
        });

        if (user) {
            const notes = await noteRepository.find({
                relations: {
                    tags: true,
                },
                where: {
                    user: {
                        id: req.session.userId,
                    },
                    isArchived: false,
                },
            });

            return res.json(notes);
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to get notes:', err.message);
        }
    }
}
