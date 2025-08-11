import { Router } from 'express';

import * as orderCtrl from '../controllers/order.controller';

const router = Router();

router.put('/artist', orderCtrl.updateOrder);

export default router;
