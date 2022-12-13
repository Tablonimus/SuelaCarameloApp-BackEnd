const axios = require("axios");
const { Notice, Team, Match } = require("../db");

async function getMatchDetail(id) {
  try {
    const match = await Match.findByPk(id);
    return match;
  } catch (error) {
    throw new Error("getMatchDetail controller error");
  }
}

////////////FIND ALL DB INFO///////
async function getAllMatchs() {
  try {
    const dbMatchs = await Match.findAll({
      include: {
        model: Team,
        through: {
          attributes: [],
        },
      },
    });
    const jsonData = await Promise.all(
      dbMatchs.map(async (match) => match.toJSON())
    );

    return jsonData;
  } catch (error) {
    throw new Error("getAllMatchs controller error");
  }
}
async function createMatch(
  place,
  date,
  time,
  local,
  visitor,
  category,
  teams
) {
  try {
    const newMatch = await Match.create({
      place,
      date,
      time,
      local,
      visitor,
      category,
    });

    if (teams[0] !== undefined) {
      const dbTeams = await Team.findAll({
        where: {
          short_name: teams,
        },
      });
      newMatch.addTeam(dbTeams);
    }

    return "Partido Creado Correctamente";
  } catch (error) {
    throw new Error("createMatch Error");
  }
}

module.exports = { getAllMatchs, createMatch, getMatchDetail };
