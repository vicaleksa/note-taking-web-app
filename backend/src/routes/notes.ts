import express from 'express';
import {
    getAllNotes, getNote, saveNotes, updateNote,
} from '../controllers/notesController';

export const notesRouter = express.Router();

notesRouter.get('/', getAllNotes);
notesRouter.get('/:noteId', getNote);
notesRouter.patch('/update/:noteId', updateNote);
notesRouter.post('/add', saveNotes);
