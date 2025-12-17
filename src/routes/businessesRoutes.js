import { Router } from 'express';
import { getAllBusinesses } from '../controllers/businessController.js';

const router = Router();

router.get('/businesses', getAllBusinesses);

export default router;
