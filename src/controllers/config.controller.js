import Config from "../models/config.model.js";

// GET /sc/configs/active-tournament
export const getActiveTournament = async (req, res) => {
  try {
    let config = await Config.findOne({ key: "activeTournament" });
    if (!config) {
      // Auto-create with defaults on first call
      config = await Config.create({ key: "activeTournament", tournament: "Apertura", season: "2026" });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// PATCH /sc/configs/active-tournament
export const updateActiveTournament = async (req, res) => {
  try {
    const { tournament, season } = req.body;
    if (!tournament || !season) {
      return res.status(400).json({ status: "Error", message: "tournament y season son requeridos" });
    }
    const config = await Config.findOneAndUpdate(
      { key: "activeTournament" },
      { tournament, season },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(config);
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};
