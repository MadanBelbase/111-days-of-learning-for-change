import express from 'express';
import { generateSummary } from '../controller/summaryController';

const router = express.Router();

router.post('/generate', generateSummary);

export default router;
