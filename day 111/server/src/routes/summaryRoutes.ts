import express from 'express';
import { generateSummary } from '../controller/summaryController';

const router = express.Router();

router.post('/blog-summary/:id', generateSummary);

export default router;
