import Team from "../models/teams.model.js";

export const getTeams = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};

export const createTeam = async (req, res) => {
  const { name, category, players, details, image } = req.body;

  const newTeam = new Team({
    name,
    category,
    players,
    details,
    image,
  });

  const savedTeam = await newTeam.save();
  res.json(savedTeam);
};

