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
    // Array body = bulk import from Excel; object body = single player from form
    if (Array.isArray(req.body)) {
      await Player.create(req.body);
    } else if (typeof req.body === "object" && !Array.isArray(req.body)) {
      // Check if it's a nested object of players (Excel import format: { "0": {...}, "1": {...} })
      const values = Object.values(req.body);
      const isBulk = values.length > 0 && typeof values[0] === "object";
      if (isBulk) {
        await Player.create(values.flat());
      } else {
        await Player.create(req.body);
      }
    }

    res.status(201).json("creado");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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
