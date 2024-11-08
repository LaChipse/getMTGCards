import express from 'express';
import homeController from '../controllers/homeController';

const router = express.Router();

router.get('/', homeController.home);

export default router;