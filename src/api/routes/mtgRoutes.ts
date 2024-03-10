import express from 'express';
import mtgController from '../controllers/mtgController';
import homeController from '../controllers/homeController';

const router = express.Router();

router.get('/mtg/:firstDate/:lastDate?', mtgController.getExcelMTGCards);
router.get('/', homeController.home);

export default router;