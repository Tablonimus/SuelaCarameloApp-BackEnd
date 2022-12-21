const axios = require("axios");
const { Notice, Team } = require("../db");

async function getNoticeDetail(id) {
  try {
    const notice = await Notice.findByPk(id);
    return notice;
  } catch (error) {
    throw new Error("getNoticeDetail controller error");
  }
}

async function getAllNotices() {
  ////////////FIND ALL DB INFO///////

  try {
    const dbNotices = await Notice.findAll( {
      include: {
        model: Team,
        through: {
          attributes: [],
        },
      },
    });
    const jsonData = await Promise.all(
      dbNotices.map(async (notice) => notice.toJSON())
    );

    return jsonData;
  } catch (error) {
    throw new Error("getAllNotices controller error");
  }
}
async function createNotice(
  title,
  subtitle,
  images,
  videos,
  content,
  category,
  teams
) {
  try {
    const newNotice = await Notice.create({
      title,
      subtitle,
      images,
      videos,
      content,
      category,
    });

    if (teams[0] !== undefined) {
      const dbTeams = await Team.findAll({
        where: {
          short_name: teams,
        },
      });
      newNotice.addTeam(dbTeams);
    }
    return "Noticia Creada Correctamente";
  } catch (error) {
    throw new Error("createNotice Error", console.log(error));
  }
}

module.exports = { getAllNotices, createNotice, getNoticeDetail };
