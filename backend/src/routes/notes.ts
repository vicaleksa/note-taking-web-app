import express from 'express';
import { saveNotes } from '../controllers/notesController';

export const notesRouter = express.Router();

notesRouter.post('/add', saveNotes);
