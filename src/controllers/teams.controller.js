import Team from "../models/teams.model.js";

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
