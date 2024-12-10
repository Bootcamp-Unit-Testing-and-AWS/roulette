import Roulette from "../models/roulette.js";

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

export default {
  createRoulette,
  updateRoulette,
};
