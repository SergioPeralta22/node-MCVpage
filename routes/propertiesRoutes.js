import express from 'express';
import { admin } from '../controllers/propertiesController.js';
const router = express.Router();

router.get('/my-properties', admin);

export default router;
