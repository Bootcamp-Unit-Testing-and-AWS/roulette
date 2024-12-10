import { Schema, model } from "mongoose";

const rouletteSchema = new Schema({
  status: { type: Boolean, required: true, default: false },
});

const Roulette = model("Roulette", rouletteSchema);

export default Roulette;
