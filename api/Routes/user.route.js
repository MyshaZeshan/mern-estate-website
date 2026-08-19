import express from "express";
import { updateUser } from "../Controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../Controller/user.controller.js";
import { getUserListing } from "../Controller/user.controller.js";


const router = express.Router();
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listing/:id',verifyToken,getUserListing)

export default router;