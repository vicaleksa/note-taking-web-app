import express from 'express';
import {
    getAllNotes, getNote, saveNotes, updateNote, deleteNote,
} from '../controllers/notesController';

export const notesRouter = express.Router();

notesRouter.get('/', getAllNotes);
notesRouter.get('/:noteId', getNote);
notesRouter.patch('/update/:noteId', updateNote);
notesRouter.delete('/delete/:noteId', deleteNote);
notesRouter.post('/add', saveNotes);
