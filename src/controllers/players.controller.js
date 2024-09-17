import Player from "../models/players.model.js";

export const getPlayers = async (req, res) => {
  const players = await Player.find();
  res.json(players);
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
