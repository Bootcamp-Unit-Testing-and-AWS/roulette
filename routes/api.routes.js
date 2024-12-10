import express from "express";
const router = express.Router();

import roulette from "./roulette.routes.js";
import bet from "./bet.routes.js";

router.use("/roulette", roulette);
router.use("/bet", bet);

export default router;
