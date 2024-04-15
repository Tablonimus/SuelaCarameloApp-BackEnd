
import Player from "../models/players.model.js";

export const getPlayers = async(req,res) => {
    const players = await Player.find();
    res.json(players)
}
export const createPlayer = async (req, res) => {
  const { name, image, team } = req.body;
  const newPlayer = new Player({
    name,
    image,
    team
  });
  const savedPlayer = await newPlayer.save()
  res.json(savedPlayer)
};

export const deletePlayer = async (req, res) => {
    const player = await Player.findByIdAndDelete(req.params.id)
    if(!player) return res.status(404).json({message: "Player not found"})
    res.sendStatus(204)
};

export const updatePlayer = async (req, res) => {
    const player = await Noticia.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!player) return res.status(404).json({message: "Player not found"})
    res.json(noticia)
};

