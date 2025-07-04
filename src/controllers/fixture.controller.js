import Fixture from "../models/fixture.model.js";

export const getFixtures = async (req, res) => {
  try {
    const { category = "A1", season, tournament } = req.query;

    const query = { category };
    if (season) query.season = season;
    if (tournament) query.tournament = tournament;

    const fixtures = await Fixture.find(query).sort({ number: 1 });
    const activeFixture = await Fixture.findOne({ ...query, is_Active: true });

    res.json({
      fixtures,
      activeFixture: activeFixture || null,
      seasons: await Fixture.distinct("season", { category }),
      tournaments: await Fixture.distinct("tournament", {
        category,
        ...(season && { season }),
      }),
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const createFixture = async (req, res) => {
  try {
    const { number, image, category, season, tournament } = req.body;

    // Verificar si ya existe
    const existingFixture = await Fixture.findOne({
      number,
      category,
      season,
      tournament,
    });

    if (existingFixture) {
      return res.status(400).json({
        status: "Error",
        message: "Ya existe un fixture con estos datos",
      });
    }

    const newFixture = await Fixture.create(req.body);
    res.status(201).json(newFixture);
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

export const updateFixture = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_Active, ...updateData } = req.body;

    // Si se marca como activo, desactivar otros de la misma categoría/temporada/torneo
    if (is_Active) {
      const fixture = await Fixture.findById(id);
      await Fixture.updateMany(
        {
          category: fixture.category,
          season: fixture.season,
          tournament: fixture.tournament,
          is_Active: true,
        },
        { is_Active: false }
      );
    }

    const updatedFixture = await Fixture.findByIdAndUpdate(
      id,
      { ...updateData, is_Active },
      { new: true, runValidators: true }
    );

    if (!updatedFixture) {
      return res.status(404).json({ message: "Fixture no encontrado" });
    }

    res.json(updatedFixture);
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

export const deleteFixture = async (req, res) => {
  try {
    const deletedFixture = await Fixture.findByIdAndDelete(req.params.id);
    if (!deletedFixture) {
      return res.status(404).json({ message: "Fixture no encontrado" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const setActiveFixture = async (req, res) => {
  try {
    const { id } = req.params;
    const fixture = await Fixture.findById(id);

    if (!fixture) {
      return res.status(404).json({ message: "Fixture no encontrado" });
    }

    // Desactivar todos los fixtures de la misma categoría/temporada/torneo
    await Fixture.updateMany(
      {
        category: fixture.category,
        season: fixture.season,
        tournament: fixture.tournament,
        is_Active: true,
      },
      { is_Active: false }
    );

    // Activar el fixture seleccionado
    const activatedFixture = await Fixture.findByIdAndUpdate(
      id,
      { is_Active: true },
      { new: true }
    );

    res.json(activatedFixture);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
