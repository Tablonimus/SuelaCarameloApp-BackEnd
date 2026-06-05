import Noticia from "../models/notices.model.js";

export const getNoticias = async (req, res) => {
  try {
    const { category, admin } = req.query;

    const filter = admin === "true" ? {} : { is_approved: true };
    if (category) filter.category = category;

    const noticias = await Noticia.find(filter);

    const orderedNotices = noticias.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(orderedNotices);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createNoticia = async (req, res) => {
  try {
    const newNotice = await Noticia.create(req.body);

    res.json(newNotice);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getNoticia = async (req, res) => {
  const noticia = await Noticia.findById(req.params.id);
  if (!noticia) return res.status(404).json({ message: "Noticia not found" });
  res.json(noticia);
};

export const deleteNoticia = async (req, res) => {
  const noticia = await Noticia.findByIdAndDelete(req.params.id);
  if (!noticia) return res.status(404).json({ message: "Noticia not found" });
  res.sendStatus(204);
};

export const updateNoticia = async (req, res) => {
  const noticia = await Noticia.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!noticia) return res.status(404).json({ message: "Noticia not found" });
  res.json(noticia);
};

export const approveAll = async (req, res) => {
  try {
    const result = await Noticia.updateMany({}, { $set: { is_approved: true } });
    res.json({ updated: result.modifiedCount });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const toggleApproval = async (req, res) => {
  try {
    const noticia = await Noticia.findById(req.params.id);
    if (!noticia) return res.status(404).json({ message: "Noticia not found" });
    noticia.is_approved = !noticia.is_approved;
    await noticia.save();
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ error });
  }
};
