import Position from "../models/positions.model.js";

export const getPositions = async (req, res) => {
  const Positions = await Position.find();
  res.json(Positions);
};

export const getPositionById = async (req, res) => {
  const positions = await Position.findById(req.params.id);
  res.json(positions);
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

export const deletePosition = async (req, res) => {
  const Position = await Position.findByIdAndDelete(req.params.id);
  if (!Position) return res.status(404).json({ message: "Position not found" });
  res.sendStatus(204);
};

export const updatePosition = async (req, res) => {
  const Position = await Noticia.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!Position) return res.status(404).json({ message: "Position not found" });
  res.json(noticia);
};
