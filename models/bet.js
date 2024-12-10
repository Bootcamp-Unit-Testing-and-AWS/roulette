import { Schema, model } from "mongoose";

const betSchema = new Schema({
  identification_user: { type: Number, required: true, unique: true },
  bet_number: { type: Number, required: true, unique: true },
  colour: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  roulette: {
    type: Schema.Types.ObjectId,
    ref: "Roulette",
    required: true,
  },
});

const Bet = model("Bet", betSchema);

export default Bet;
