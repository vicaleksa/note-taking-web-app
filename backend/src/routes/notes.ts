import express from 'express';
import { getAllNotes, saveNotes } from '../controllers/notesController';

export const notesRouter = express.Router();

notesRouter.get('/', getAllNotes);
notesRouter.post('/add', saveNotes);
