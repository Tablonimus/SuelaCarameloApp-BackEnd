import Position from "../models/positions.model.js";
import PositionsGeneral from "../models/positionsGeneral.model.js";

export const getPositions = async (req, res) => {
  try {
    const { category = "FSP Masculino" } = req.query;
    console.log(category);

    const positions = await Position.findOne({ category: category });

    res.json(positions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};
export const getGeneralPositions = async (req, res) => {
  try {
    const { category = "FSP Masculino" } = req.query;

    const positions = await PositionsGeneral.findOne({ category: category });

    res.json(positions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const createPosition = async (req, res) => {
  try {
    const { image, category } = req.body;

    const position = await Position.findOneAndUpdate(
      { category: category },
      { image: image, category: category },
      { new: true }
    );
    console.log(position);
    if (position) {
      console.log("UPDATING POS", position);
      res.json(position);
    } else {
      const newPosition = await Position.create({
        image: image,
        category: category,
      });
      console.log("NEW POS", newPosition);
      res.json(newPosition);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};
export const createGeneralPosition = async (req, res) => {
  try {
    const { image, category } = req.body;

    const position = await PositionsGeneral.findOneAndUpdate(
      { category: category },
      { image: image, category: category },
      { new: true }
    );
    console.log(position);
    if (position) {
      console.log("UPDATING POS", position);
      res.json(position);
    } else {
      const newPosition = await PositionsGeneral.create({
        image: image,
        category: category,
      });
      console.log("NEW POS", newPosition);
      res.json(newPosition);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};
