const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getAllMatchs,
  getMatchDetail,
  createMatch,
} = require("../controllers/matchsControllers.js");
const axios = require("axios");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const matchs = await getAllMatchs();
    res.status(201).json(matchs);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const match = await getMatchDetail(id);
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      place,
      date,
      time,
      local,
      visitor,
      category,
     teams,
    } = req.body;

    const newMatch = await createMatch(
      place,
      date,
      time,
      local,
      visitor,    
      category,     
      teams
    );
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
