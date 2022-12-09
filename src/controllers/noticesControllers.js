const axios = require("axios");
const { Notice } = require("../db");

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
    const dbNotices = await Notice.findAll();
    const jsonData = await Promise.all(
      dbNotices.map(async (notice) => notice.toJSON())
    );

    return jsonData;
  } catch (error) {
    throw new Error("getAllNotices controller error");
  }
}
async function createNotice(title, subtitle, images,videos, content,category) {
  try {
    const newNotice = await Notice.create({
      title,
      subtitle,
      images,
      videos,
      content,
      category
    });
    return "Noticia Creada Correctamente";
  } catch (error) {
    throw new Error("create Notice Error");
  }
}

module.exports = { getAllNotices, createNotice, getNoticeDetail };
