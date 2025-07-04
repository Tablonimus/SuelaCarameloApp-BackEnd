import Fixture from "../models/fixture.model.js";

// Helper para ordenar fixtures
const sortFixtures = (fixtures) => {
  const stageOrder = {
    temporada: 0,
    octavos: 1,
    cuartos: 2,
    semifinal: 3,
    final: 4,
  };

  return fixtures.sort((a, b) => {
    // Primero por etapa
    if (stageOrder[a.stage] !== stageOrder[b.stage]) {
      return stageOrder[a.stage] - stageOrder[b.stage];
    }

    // Para temporada regular, ordenar por matchweek
    if (a.stage === "temporada" && b.stage === "temporada") {
      return a.matchweek - b.matchweek;
    }

    // Para playoffs, ordenar por fecha de inicio
    return a.playDates.from - b.playDates.from;
  });
};

export const getFixtures = async (req, res) => {
  try {
    const { category = "A1", season, tournament } = req.query;

    const query = { category };
    if (season) query.season = season;
    if (tournament) query.tournament = tournament;

    let fixtures = await Fixture.find(query).lean();

    // Agregar el campo virtual dateRange
    fixtures = fixtures.map((f) => ({
      ...f,
      dateRange: f.playDates?.from
        ? `Jugado del ${f.playDates.from.toLocaleDateString(
            "es-ES"
          )} al ${f.playDates.to.toLocaleDateString("es-ES")}`
        : "Temporada regular",
    }));

    fixtures = sortFixtures(fixtures);

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
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const createFixture = async (req, res) => {
  try {
    const {
      stage = "temporada",
      number,
      tournament = "Apertura",
      ...fixtureData
    } = req.body;

    // Validación específica para playoffs
    if (
      stage !== "temporada" &&
      (!fixtureData.playDates?.from || !fixtureData.playDates?.to)
    ) {
      return res.status(400).json({
        status: "Error",
        message: "Para etapas de playoffs se requieren fechas de juego",
      });
    }

    // Validación para temporada regular
    if (stage === "temporada" && !fixtureData.matchweek) {
      return res.status(400).json({
        status: "Error",
        message: "Para temporada regular se requiere el número de fecha",
      });
    }

    // Validar torneo
    if (!["Apertura", "Clausura", "Torneo Anual"].includes(tournament)) {
      return res.status(400).json({
        status: "Error",
        message: "Torneo no válido. Debe ser Apertura, Clausura o Torneo Anual",
      });
    }

    const existingFixture = await Fixture.findOne({
      $or: [
        // Evitar duplicados en misma categoría/temporada/torneo/número
        {
          number,
          category: fixtureData.category,
          season: fixtureData.season,
          tournament,
        },
        // Para playoffs, evitar solapamiento de fechas en misma categoría/torneo
        stage !== "temporada"
          ? {
              stage,
              category: fixtureData.category,
              season: fixtureData.season,
              tournament,
              "playDates.from": { $lte: fixtureData.playDates.to },
              "playDates.to": { $gte: fixtureData.playDates.from },
            }
          : {
              matchweek: fixtureData.matchweek,
              category: fixtureData.category,
              season: fixtureData.season,
              tournament,
            },
      ],
    });

    if (existingFixture) {
      return res.status(400).json({
        status: "Error",
        message: "Ya existe un fixture con estos datos o con fechas solapadas",
      });
    }

    const newFixture = await Fixture.create({
      number,
      stage,
      tournament,
      ...fixtureData,
    });

    res.status(201).json(newFixture);
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

export const updateFixture = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_Active, tournament, ...updateData } = req.body;

    // Si se marca como activo, desactivar otros de la misma categoría/temporada/torneo
    if (is_Active) {
      const fixture = await Fixture.findById(id);
      await Fixture.updateMany(
        {
          category: fixture.category,
          season: fixture.season,
          tournament: fixture.tournament,
          is_Active: true,
          _id: { $ne: id },
        },
        { is_Active: false }
      );
    }

    const updatedFixture = await Fixture.findByIdAndUpdate(
      id,
      { ...updateData, is_Active, tournament },
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
        _id: { $ne: id },
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

export const normalizeAllFixtures = async (req, res) => {
  try {
    const allFixtures = await Fixture.find({});

    let updatedCount = 0;
    const defaultImage =
      "https://res.cloudinary.com/demo/image/upload/default.jpg"; // Reemplazalo por tu imagen genérica
    const defaultCategory = "DH"; // O elegí otra por defecto

    for (const fixture of allFixtures) {
      let needsUpdate = false;

      // Campos básicos
      if (!fixture.stage) {
        fixture.stage = "temporada";
        needsUpdate = true;
      }

      if (!fixture.season) {
        fixture.season = "2025";
        needsUpdate = true;
      }

      if (!fixture.tournament) {
        fixture.tournament = "Apertura";
        needsUpdate = true;
      }

      if (!fixture.image) {
        fixture.image = defaultImage;
        needsUpdate = true;
      }

      if (!fixture.category) {
        fixture.category = defaultCategory;
        needsUpdate = true;
      }

      if (!fixture.number) {
        fixture.number = "0";
        needsUpdate = true;
      }

      // Validaciones según etapa
      if (fixture.stage === "temporada" && !fixture.matchweek) {
        fixture.matchweek = 1;
        needsUpdate = true;
      }

      if (fixture.stage !== "temporada") {
        if (!fixture.playDates) fixture.playDates = {};
        if (!fixture.playDates.from) {
          fixture.playDates.from = new Date("2025-01-01");
          needsUpdate = true;
        }
        if (!fixture.playDates.to) {
          fixture.playDates.to = new Date("2025-01-02");
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        await fixture.save();
        updatedCount++;
      }
    }

    const statsByCategory = await Fixture.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          activeCount: {
            $sum: { $cond: [{ $eq: ["$is_Active", true] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const activeFixtures = await Fixture.find({ is_Active: true });

    res.status(200).json({
      success: true,
      message: `Normalización completa. ${updatedCount} fixtures actualizados.`,
      stats: {
        totalUpdated: updatedCount,
        byCategory: statsByCategory,
      },
      activeFixtures,
      recommendations: {
        revisiones: "Verificar imágenes repetidas o fixtures con mismo número",
        sugerencia:
          "Agregar validaciones personalizadas para evitar duplicados silenciosos",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error durante la normalización",
      error: error.message,
    });
  }
};

export const fixFixtureNumbersToIntegers = async (req, res) => {
  try {
    const fixtures = await Fixture.find({});
    let updated = 0;

    for (const fixture of fixtures) {
      if (typeof fixture.number === "string") {
        fixture.number = parseInt(fixture.number, 10);
        await fixture.save();
        updated++;
      }
    }

    res.json({ updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
