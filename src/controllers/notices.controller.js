import Noticia from "../models/notices.model.js";

export const getNoticias = async (req, res) => {
  try {
    const { category } = req.query;

    console.log("cate", category);
    console.log("entro");

    const noticias = category
      ? await Noticia.find({ category: category })
      : await Noticia.find();

    const orderedNotices = noticias.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

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
