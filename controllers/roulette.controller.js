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
    const updateStatus = req.body;

    if (!updateStatus.status) {
      // Actualizar el estado de la ruleta
      const rouletteUpdate = await Roulette.findByIdAndUpdate(
        id,
        updateStatus,
        { new: true }
      );
      if (!rouletteUpdate) {
        return res.status(404).json({ message: "Roulette not found" });
      }

      // Obtener todas las apuestas
      const seekRouletteWithAllBets = await Bet.find({ roulette: id }).populate(
        {
          path: "roulette",
        }
      );
      console.log("seekk--->", seekRouletteWithAllBets);
      // Generar un número aleatorio entre 0 y 36
      const randomNumber = Math.floor(Math.random() * 37);

      // Filtrar y calcular premios por número (bet_number)
      const payPrizesByNumber = seekRouletteWithAllBets
        .map((bet) => {
          // Si el número es par, el color debe ser rojo
          // Si el número es impar, el color debe ser negro
          if (bet.bet_number === randomNumber) {
            return {
              identification_user: bet.identification_user,
              colour: bet.colour,
              quantity: bet.quantity,
            };
          }
          return `There is no winning number. Your number is: ${bet.bet_number} and the roulette number was: ${randomNumber}`; // Si no
        })
        .filter(Boolean);

      // Filtrar y calcular premios por color (rojo o negro)
      const filterWin = seekRouletteWithAllBets
        .map((bet) => {
          // Si el número es par, el color debe ser rojo
          // Si el número es impar, el color debe ser negro
          if (
            (bet.bet_number % 2 === 0 && bet.colour === "red") ||
            (bet.bet_number % 2 === 1 && bet.colour === "black")
          ) {
            return {
              identification_user: bet.identification_user,
              colour: bet.colour,
              quantity: bet.quantity,
            };
          }
          return;
        })
        .filter(Boolean);

      //console.log("filtered by colour:", filterWin);

      // Generar un número aleatorio para el color (0 para rojo, 1 para negro)
      const winByColour = Math.random() < 0.5 ? 0 : 1; // 0 -> rojo, 1 -> negro

      // Filtrar y calcular los premios por color
      const payPrizes = filterWin
        .map((payColour) => {
          const payWins = {
            identification_user: payColour.identification_user,
            colour: payColour.colour,
            quantity: payColour.quantity * 1.8,
          };

          if (
            (winByColour === 0 && payColour.colour === "red") ||
            (winByColour === 1 && payColour.colour === "black")
          ) {
            return payWins;
          }
          return null;
        })
        .filter(Boolean); //Elimina null

      return res.status(200).json({
        message: "Roulette closed and winners paid",
        byColors: payPrizes,
        byNumbers: payPrizesByNumber,
      });
    }

    return res.status(404).json({ message: "Status disabled" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Error when trying to close roulette", error });
  }
}

export default {
  createRoulette,
  updateRoulette,
  closeRoulette,
};
