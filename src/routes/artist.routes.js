import { Router } from 'express';
const router = Router();

import * as artistCtrl from '../controllers/artist.controller';

router.get('/', artistCtrl.getArtists);

router.get('/:id', artistCtrl.getArtistById);

router.post('/', artistCtrl.createArtist);

// router.put('/:id', artistCtrl.updateArtistById);

router.put('/:name', artistCtrl.updateArtistByName);

router.delete('/:id', artistCtrl.deleteArtistById);

export default router;
