import Roulette from "../models/roulette.js";
import Bet from "../models/bet.js";

async function createRoulette(req, res) {
  try {
    const { status } = req.body;

    const newRoulette = await Roulette.create({ status });

    res.status(201).json({
      message: "Roulette created successfully",
      roulette: newRoulette._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when trying to create the Roulette", error });
  }
}
async function updateRoulette(req, res) {
  const id = req.params.id;
  //console.log(id);
  const updateStatus = req.body;
  try {
    const rouletteUpdate = await Roulette.findByIdAndUpdate(id, updateStatus, {
      new: true,
    });
    //console.log(rouletteUpdate);
    if (!rouletteUpdate) {
      return res.status(404).json({ message: "Roulette no found" });
    }
    // res.status(200).json({
    //   message: "Status updated successfully",
    //   employee: rouletteUpdate,
    // });
    if (rouletteUpdate.status) {
      return res.status(200).json({ message: "Status activated" });
    } else {
      return res.status(404).json({ message: "Status disabled" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error when updating the status", error });
  }
}
async function closeRoulette(req, res) {
  try {
    const id = req.params.id;
    //console.log(id);
    const updateStatus = req.body;
    //console.log("false-->", updateStatus);
    if (!updateStatus.status) {
      //console.log("ingreso a false");
      const rouletteUpdate = await Roulette.findByIdAndUpdate(
        id,
        updateStatus,
        {
          new: true,
        }
      );
      //console.log(rouletteUpdate);
      if (!rouletteUpdate) {
        return res.status(404).json({ message: "Roulette no found" });
      }

      const seekRouletteWithAllBets = await Bet.find().populate("roulette", [
        "_id",
      ]);

      const filterWin = seekRouletteWithAllBets.map((bet) => {
        const newArrayColour = {
          identification_user: bet.identification_user,
          colour: bet.colour,
          quantity: bet.quantity,
        };

        if (bet.bet_number % 2 === 0 && bet.colour === "red") {
          return newArrayColour;
        } else {
          return newArrayColour;
        }
      });

      //console.log(filterWin);

      //console.log("newArray-->", filterWin);

      const winByColour = Math.round(Math.random(2));

      const payPrizes = filterWin
        .map((payColour) => {
          const payWins = {
            identification_user: payColour.identification_user,
            quantity: payColour.quantity * 1.8,
          };

          if (winByColour === 0 && payColour.colour === "red") {
            return payWins;
          }

          if (winByColour === 1 && payColour.colour === "black") {
            return payWins;
          }

          return null;
        })
        .filter(Boolean);

      return res
        .status(200)
        .json({ message: "Roulette closed and winners paid", payPrizes });
    }

    if (rouletteUpdate.status) {
      return res.status(200).json({ message: "Status activated" });
    } else {
      return res.status(404).json({ message: "Status disabled" });
    }
  } catch (error) {}
}

export default {
  createRoulette,
  updateRoulette,
  closeRoulette,
};
