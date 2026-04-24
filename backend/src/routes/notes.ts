import express from 'express';
import { getAllNotes, getNote, saveNotes } from '../controllers/notesController';

export const notesRouter = express.Router();

notesRouter.get('/', getAllNotes);
notesRouter.get('/:noteId', getNote);
notesRouter.post('/add', saveNotes);
