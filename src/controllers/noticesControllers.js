const axios = require("axios");
const { Notice } = require("../db");

async function getAllNotices() {
  ////////////FIND ALL DB INFO///////

  try {
    const dbNotices = await Notice.findAll();
    const jsonData = await Promise.all(
      dbNotices.map(async (notice) => notice.toJSON())
    );

    return jsonData;
  } catch (error) {
    throw new Error("getAllNotices controller error");
  }
}
async function createNotice(title, subtitle, images, content) {
  try {
    const newNotice = await Notice.create({
      title,
      subtitle,
      images,
      content,
    });
    return "Noticia Creada Correctamente";
  } catch (error) {
    throw new Error("create Notice Error");
  }
}

module.exports = { getAllNotices, createNotice };
