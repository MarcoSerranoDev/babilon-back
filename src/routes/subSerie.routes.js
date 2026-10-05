import { Router } from 'express';
const router = Router();

import * as subSerieCtrl from '../controllers/subSerie.controller';

router.get('/', subSerieCtrl.getSubSeries);

router.post('/', subSerieCtrl.createSubSerie);

router.put('/:id', subSerieCtrl.updateSubSerie);

export default router;
