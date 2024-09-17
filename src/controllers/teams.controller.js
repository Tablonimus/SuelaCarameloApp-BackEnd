import Team from "../models/teams.model.js";

export const getTeams = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};

export const createTeam = async (req, res) => {
  const { name, category, players, details, image } = req.body;

  await Team.create({
    name,
    category,
    players,
    details,
    image,
  });

  res.json("creado");
};
export const createManyTeams = async (req, res) => {
  try {
    const teams = Object.keys(req.body);

    const teamsData = teams.map((team) => {
      return {
        name: team,
        category: "FEM",
        logo: "",
        address: "",
        stadium: "",
        colors: "",
        teams: [],
      };
    });

    // console.log(teamsData);

    Team.create(teamsData);

    res.status(200).json("creado");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
