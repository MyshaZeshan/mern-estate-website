import express from "express";
import {signup,signin} from "../Controller/auth.controller.js";
import {google} from "../Controller/auth.controller.js";
const router  =express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post('/google',google);

export default router;