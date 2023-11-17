const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getAllNotices,
  createNotice,
  getNoticeDetail,
} = require("../controllers/noticesControllers");

const router = Router();


router.get("/", async (req, res) => {
  try {
    const notices = await getAllNotices();
    res.status(201).json(notices);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await getNoticeDetail(id);
    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { title, subtitle, images, videos, content, category, teams } = req.body;

    const newNotice = await createNotice(
      title,
      subtitle,
      images,
      videos,
      content,
      category,
      teams
    );
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
