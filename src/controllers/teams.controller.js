import Team from "../models/teams.model.js";
import Player from "../models/players.model.js";
import Fixture from "../models/fixture.model.js";
import Noticia from "../models/notices.model.js";
import Position from "../models/positions.model.js";
import PositionsGeneral from "../models/positionsGeneral.model.js";
import Match from "../models/matchs.model.js";

export const getTeams = async (req, res) => {
  const { name, category } = req.query;
  try {
    const filter = {};
    if (name) filter.name = name;
    if (category) filter.category = category;
    const teams = await Team.find(filter);
    res.json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const createTeam = async (req, res) => {
  const { name, logo, address, foundation, stadium, colors, category, shortName } = req.body;

  try {
    await Team.create({ name, logo, address, foundation, stadium, colors, category, shortName });
    res.status(201).json("creado");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const createManyTeams = async (req, res) => {
  try {
    const teams = Object.keys(req.body);
    const { category } = req.query;

    const teamsData = teams.map((team) => {
      return {
        name: team,
        category: category,
        logo: "",
        address: "",
        stadium: "",
        colors: "",
        teams: [],
      };
    });

    // console.log(teamsData);

    await Team.create(teamsData);

    res.status(200).json("creado");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateTeam = async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!team) return res.status(404).json({ message: "Team not found" });
  res.json(team);
};

export const deleteTeam = async (req, res) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) return res.status(404).json({ message: "Team not found" });
  res.sendStatus(204);
};

export const normalizeCategories = async (req, res) => {
  try {
    const mapping = { A1: "FSP Masculino", F1: "FSP Femenino", FEM: "FSP Femenino" };
    const collections = [
      { name: "teams", model: Team },
      { name: "players", model: Player },
      { name: "fixtures", model: Fixture },
      { name: "notices", model: Noticia },
      { name: "positions", model: Position },
      { name: "positionsGeneral", model: PositionsGeneral },
      { name: "matches", model: Match },
    ];

    const results = {};
    for (const { name, model } of collections) {
      results[name] = {};
      for (const [oldVal, newVal] of Object.entries(mapping)) {
        const r = await model.updateMany(
          { category: oldVal },
          { $set: { category: newVal } }
        );
        if (r.modifiedCount > 0) results[name][oldVal] = r.modifiedCount;
      }
    }

    res.json({ message: "Categorías normalizadas en todas las colecciones", results });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
