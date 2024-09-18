import Player from "../models/players.model.js";

export const getPlayers = async (req, res) => {
  const { name, category } = req.query;
  try {
    if (name && category) {
      const players = await Player.find({ current_club_name: name , category: category});
      res.json(players);
    } else {
      const players = await Player.find();
      res.json(players);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const createPlayer = async (req, res) => {
  try {
    const playerData = Object.values(req.body);
    console.log(playerData.flat());

    await Player.create(playerData.flat());

    res.json("creado");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const deletePlayer = async (req, res) => {
  const player = await Player.findByIdAndDelete(req.params.id);
  if (!player) return res.status(404).json({ message: "Player not found" });
  res.sendStatus(204);
};

export const updatePlayer = async (req, res) => {
  const player = await Noticia.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!player) return res.status(404).json({ message: "Player not found" });
  res.json(noticia);
};
