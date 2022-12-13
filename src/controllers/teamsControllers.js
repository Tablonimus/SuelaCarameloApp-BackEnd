const axios = require("axios");
const { Notice, Team,Match } = require("../db");

async function getTeamDetail(id) {
  try {
    const team = await Team.findByPk(id);
    return team;
  } catch (error) {
    throw new Error("getNoticeDetail controller error");
  }
}

////////////FIND ALL DB INFO///////
async function getAllTeams() {

  try {
    const dbTeams = await Team.findAll({
 
      include:{
        model: Match,
        through: {
          attributes: [],
        },
      }
    });
    const jsonData = await Promise.all(
        dbTeams.map(async (team) => team.toJSON())
    );

    return jsonData;
  } catch (error) {
    throw new Error("getAllNotices controller error");
  }
}
async function createTeam(
 name,short_name,logo,place,category
) {
  try {
    const newTeam = await Team.create({
      name,short_name,logo,place,category
    });

   
    return "Equipo Creada Correctamente";
  } catch (error) {
    throw new Error("createTeam Error");
  }
}

module.exports = { getAllTeams, createTeam, getTeamDetail };
