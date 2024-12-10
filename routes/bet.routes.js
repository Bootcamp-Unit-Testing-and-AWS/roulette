import express from "express";
import betController from "../controllers/bet.controller.js";

const router = express.Router();

router.post("", betController.createBet);

export default router;
