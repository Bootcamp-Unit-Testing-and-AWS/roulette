import express from "express";
import rouletteController from "../controllers/roulette.controller.js";

const router = express.Router();

router.post("", rouletteController.createRoulette);
router.put("/:id", rouletteController.updateRoulette);

export default router;
