import { Schema, model } from "mongoose";

const betSchema = new Schema({
  identification_user: { type: Number, required: true, unique: true },
  bet_number: {
    type: Number,
    required: true,
    min: [0, "A number less than zero is not allowed "],
    max: [36, "A number greater than thirty-six is not allowed"],
    validate: {
      validator: function (value) {
        return value % 2 === 0 || value % 2 === 1;
      },
      message: (props) => `${props.value} is not a value valid`,
    },
  },

  colour: { type: String, enum: ["red", "black"] },
  quantity: {
    type: Number,
    min: [50, "The amount of money bet will be greater than or equal to fifty"],
    max: [
      10000,
      "The amount of money bet wil be less than or equal to ten thousand",
    ],
  },
  roulette: {
    type: Schema.Types.ObjectId,
    ref: "Roulette",
    required: true,
  },
});

const Bet = model("Bet", betSchema);

export default Bet;
