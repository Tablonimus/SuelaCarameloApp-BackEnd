import Noticia from "../models/noticias.model.js";

export const getNoticias = async (req, res) => {
  const noticias = await Noticia.find();
  res.json(noticias);
};

export const createNoticia = async (req, res) => {
  const { title, subtitle, description, date } = req.body;

  const newNoticia = new Noticia({
    title,
    subtitle,
    description,
    date,
    user: req.user.id
  });
  
  const savedNoticia = await newNoticia.save()
  res.json(savedNoticia)
};

export const getNoticia = async (req, res) => {
    const noticia = await Noticia.findById(req.params.id)
    if(!noticia) return res.status(404).json({message: "Noticia not found"})
    res.json(noticia)
};

export const deleteNoticia = async (req, res) => {
    const noticia = await Noticia.findByIdAndDelete(req.params.id)
    if(!noticia) return res.status(404).json({message: "Noticia not found"})
    res.sendStatus(204)
};

export const updateNoticia = async (req, res) => {
    const noticia = await Noticia.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!noticia) return res.status(404).json({message: "Noticia not found"})
    res.json(noticia)
};

