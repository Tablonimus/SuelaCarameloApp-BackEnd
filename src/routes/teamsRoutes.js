const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getAllTeams,
  getTeamDetail,
  createTeam,
} = require("../controllers/teamsControllers.js");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.status(201).json(teams);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const team = await getTeamDetail(id);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, short_name, logo, place, category } = req.body;

    const newTeam = await createTeam(name, short_name, logo, place, category);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
