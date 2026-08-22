import express from 'express';
import { createListing, getListing } from '../Controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { deletelisting } from '../Controller/listing.controller.js';
import { updatelisting } from '../Controller/listing.controller.js';



const router = new express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deletelisting);
router.post('/update/:id',verifyToken,updatelisting);
router.get('/get/:id',getListing);
export default router;