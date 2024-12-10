import Bet from "../models/bet.js";

async function createBet(req, res) {
  try {
    const { identification_user, bet_number, colour, quantity, roulette } =
      req.body;
    const newBet = await Bet.create({
      identification_user,
      bet_number,
      colour: colour.toLowerCase(),
      quantity,
      roulette,
    });

    res.status(201).json({
      message: "Bet created successfully",
      roulette: newBet._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when trying to create the Roulette", error });
  }
}
async function getAllBets(req, res) {
  try {
    const getBets = await Bet.find().populate("roulette");
    if (!getBets) {
      return res.json({ message: "There are no bets created" });
    }
    return res.json({ bets: getBets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when trying to create the Roulette", error });
  }
}

export default {
  createBet,
  getAllBets,
};
