import express from 'express';
import { createListing } from '../Controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { deletelisting } from '../Controller/listing.controller.js';

const router = new express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deletelisting);
export default router;