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

interface NoteIdParam {
    noteId: string,
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

export async function updateNote(req: Request<NoteIdParam, unknown, NoteData>, res: Response) {
    const {
        title,
        tags,
        content,
    } = req.body;

    const noteItem = parseInt(req.params.noteId, 10);

    if (Number.isNaN(noteItem)) {
        return res.status(400).json({ error: 'Invalid note ID' });
    }

    try {
        const userRepository = dataSource.getRepository(User);
        const noteRepository = dataSource.getRepository(Note);
        const tagRepository = dataSource.getRepository(Tag);

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

        if (user) {
            const note = await noteRepository.findOne({
                relations: {
                    tags: true,
                },
                where: {
                    id: noteItem,
                    user: {
                        id: req.session.userId,
                    },
                },
            });

            if (!note) {
                return res.status(400).json({ error: 'Note not found' });
            }

            note.title = title;
            note.tags = tagEntities;
            note.content = content;

            await noteRepository.save(note);

            return res.status(200).json({
                message: 'Note updated',
            });
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error('Note update error:', err.message);
        } else {
            console.error('Note update error:', err);
        }
        return res.status(500).json({ error: 'Note update failed. Please try again.' });
    }
}

export async function getNote(req: Request, res: Response) {
    const noteItem = parseInt(req.params.noteId, 10);

    if (Number.isNaN(noteItem)) {
        return res.status(400).json({ error: 'Invalid note ID' });
    }

    try {
        const userRepository = dataSource.getRepository(User);
        const noteRepository = dataSource.getRepository(Note);

        const user = await userRepository.findOne({
            where: { id: req.session.userId },
        });

        if (user) {
            const note = await noteRepository.findOne({
                relations: {
                    tags: true,
                },
                where: {
                    id: noteItem,
                    user: {
                        id: req.session.userId,
                    },
                },
            });

            if (!note) {
                return res.status(400).json({ error: 'Note not found' });
            }

            return res.json(note);
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to get a note:', err.message);
        }
    }
}

export async function getAllNotes(req: Request, res: Response) {
    if (!req.session.userId) {
        return res.json({ error: 'Not logged in' });
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

export async function deleteNote(req: Request, res: Response) {
    const noteItem = parseInt(req.params.noteId, 10);

    if (Number.isNaN(noteItem)) {
        return res.status(400).json({ error: 'Invalid note ID' });
    }

    try {
        const userRepository = dataSource.getRepository(User);
        const noteRepository = dataSource.getRepository(Note);
        // const tagRepository = dataSource.getRepository(Tag);

        const user = await userRepository.findOne({
            where: { id: req.session.userId },
        });

        if (user) {
            const note = await noteRepository.findOne({
                relations: {
                    tags: true,
                },
                where: {
                    id: noteItem,
                    user: {
                        id: req.session.userId,
                    },
                },
            });

            if (!note) {
                return res.status(400).json({ error: 'Note not found' });
            }

            await noteRepository.delete(noteItem);

            return res.status(204).send();
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to delete a note:', err.message);
        }
    }
}
