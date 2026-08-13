import express from 'express';
import { createListing } from '../Controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = new express.Router();

router.post('/create',verifyToken,createListing);
export default router;