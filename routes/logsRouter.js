import express from 'express';
import { getLogs } from '../controllers/logsController.js';

const logsRouter = express.Router();

logsRouter.get("/", getLogs);

export default logsRouter; 
