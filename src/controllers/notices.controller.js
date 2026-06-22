import Noticia from "../models/notices.model.js";

export const getNoticias = async (req, res) => {
  try {
    const { category, admin, page = 1, limit = 20, search } = req.query;

    const filter = admin === "true" ? {} : { is_approved: true };
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    if (admin === "true") {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const [data, total] = await Promise.all([
        Noticia.find(filter).sort({ date: -1 }).skip(skip).limit(parseInt(limit)),
        Noticia.countDocuments(filter),
      ]);
      return res.json({
        data,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
      });
    }

    const noticias = await Noticia.find(filter).sort({ date: -1 });
    res.json(noticias);
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
  const noticia = await Noticia.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!noticia) return res.status(404).json({ message: "Noticia not found" });
  res.json(noticia);
};

export const getTopNoticias = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const noticias = await Noticia.find({ is_approved: true })
      .sort({ views: -1 })
      .limit(limit)
      .select("title category views date images");
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ error });
  }
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

export const getStatsByAuthor = async (req, res) => {
  try {
    const stats = await Noticia.aggregate([
      { $match: { is_approved: true } },
      {
        $group: {
          _id: "$author.name",
          image: { $first: "$author.img" },
          totalNotas: { $sum: 1 },
          totalVistas: { $sum: { $ifNull: ["$views", 0] } },
          topNota: {
            $max: {
              views: { $ifNull: ["$views", 0] },
              title: "$title",
            },
          },
        },
      },
      { $sort: { totalVistas: -1 } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error });
  }
};
