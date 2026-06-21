import PageView from "../models/pageView.model.js";

export const trackPageView = async (req, res) => {
  try {
    const { route, section } = req.body;
    await PageView.create({
      route,
      section,
      userAgent: req.headers["user-agent"],
    });
    res.status(201).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPageViewStats = async (req, res) => {
  try {
    const { from, to } = req.query;
    const match = {};
    if (from || to) {
      match.timestamp = {};
      if (from) match.timestamp.$gte = new Date(from);
      if (to) match.timestamp.$lte = new Date(to);
    }

    const stats = await PageView.aggregate([
      ...(Object.keys(match).length ? [{ $match: match }] : []),
      { $group: { _id: "$section", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const total = stats.reduce((sum, s) => sum + s.count, 0);
    res.json({ stats, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPageViewsByDay = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const data = await PageView.aggregate([
      { $match: { timestamp: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
