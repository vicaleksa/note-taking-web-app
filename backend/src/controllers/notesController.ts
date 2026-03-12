import { Request, Response } from 'express';
import dataSource from '../data-source';
import { Note } from '../entity/note.entity';
import { Tag } from '../entity/tag.entity';

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
