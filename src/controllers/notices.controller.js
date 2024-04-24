import Noticia from "../models/notices.model.js";

export const getNoticias = async (req, res) => {
  const noticias = await Noticia.find();
  res.json(noticias);
};

export const createNoticia = async (req, res) => {
  const {
    title,
    subtitle,
    description,
    author,
    date,
    images,
    videos,
    category,
  } = req.body;

  console.log("aca", req.body);

  const newNotice = await Noticia.create(req.body);
  // const newNoticia = new Noticia({
  //   title,
  //   subtitle,
  //   description,
  //   author,
  //   date,
  //   images,
  //   videos,
  // });

  // const savedNoticia = await newNoticia.save();
  // res.json(savedNoticia);
  res.json(newNotice);
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
