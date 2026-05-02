import Player from "../models/players.model.js";

export const getPlayers = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchTerm, team } = req.query;
    const skip = (page - 1) * limit;
    let filter = {};
    if (searchTerm) {
      filter.name = { $regex: searchTerm, $options: 'i' };
    }
    if (team && team !== 'all') {
      filter.current_club_name = team;
    }
    const totalItems = await Player.countDocuments(filter);
    const players = await Player.find(filter).skip(skip).limit(parseInt(limit));
    const totalPages = Math.ceil(totalItems / limit);
    const meta = {
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      itemsPerPage: parseInt(limit)
    };
    res.json({ data: players, meta });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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
  const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!player) return res.status(404).json({ message: "Player not found" });
  res.json(player);
};
