import express, { Request, Response } from 'express';
import * as DB from './controllers/DBController';
import * as Accommodation from './controllers/apiController';

const router = express.Router();

router.get('/mapMarkers', DB.getMarkers);

router.post('/mapMarkers', DB.addMarker)

router.put('/updateAllMarkers', DB.updateAllMarkers)

router.delete('/mapMarkers', DB.removeMarker)

router.post('/user', DB.addUser)

router.get('/user', DB.getUser)

router.get('/accommodation', DB.getAccommodation)

router.put('/accommodation', DB.addAccommodation)

router.get('/getAccommodation', Accommodation.getAccommodation);

router.get('/accommodationPic', Accommodation.getAccommodationPic);

router.get('/getAccommodationDetails', Accommodation.getAccommodationDetails);


export default router;