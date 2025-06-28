import Match from "../models/matchs.model.js";
import Team from "../models/teams.model.js";

export const createMatch = async (req, res) => {
  try {
    const {
      place,
      date,
      time,
      local,
      visitor,
      category,
      referee,
      status,
      score,
      penaltyScore,
    } = req.body;

    if (!local || !visitor) {
      return res.status(400).json({ error: "Faltan equipos seleccionados" });
    }

    // Validar que los equipos existan
    const localTeam = await Team.findById(local);
    const visitorTeam = await Team.findById(visitor);

    if (!localTeam || !visitorTeam) {
      return res.status(404).json({ error: "Uno o ambos equipos no existen" });
    }

    // Crear el partido y popular inmediatamente
    const newMatch = new Match({
      place,
      date: new Date(date),
      time,
      local,
      visitor,
      category,
      referee,
      status: status || "pending",
      score: score || { local: 0, visitor: 0 },
      penaltyScore: penaltyScore || { local: 0, visitor: 0 },
    });

    await newMatch.save();

    // Poblar los campos antes de enviar la respuesta
    await newMatch.populate("local", "name logo colors");
    await newMatch.populate("visitor", "name logo colors");

    res.status(201).json({
      message: "Partido creado exitosamente",
      match: newMatch,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear el partido",
      details: error.message,
    });
  }
};

// Obtener todos los partidos
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("local", "name logo")
      .populate("visitor", "name logo")
      .sort({ date: 1 }); // Ordenar por fecha ascendente

    res.status(200).json(matches);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los partidos", details: error.message });
  }
};

// Obtener un partido por ID
export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id)
      .populate("local", "name logo colors")
      .populate("visitor", "name logo colors");

    if (!match) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }

    res.status(200).json(match);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el partido", details: error.message });
  }
};

// Actualizar un partido
export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(updateData);
    // Si se actualizan equipos, validar que existan
    if (updateData.local || updateData.visitor) {
      if (updateData.local) {
        const localTeam = await Team.findById(updateData.local);
        if (!localTeam) {
          return res.status(404).json({ error: "Equipo local no encontrado" });
        }
      }
      if (updateData.visitor) {
        const visitorTeam = await Team.findById(updateData.visitor);
        if (!visitorTeam) {
          return res
            .status(404)
            .json({ error: "Equipo visitante no encontrado" });
        }
      }
    }

    // Convertir fecha si viene en el update
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const updatedMatch = await Match.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("local visitor", "name logo");

    if (!updatedMatch) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }

    res.status(200).json({
      message: "Partido actualizado exitosamente",
      match: updatedMatch,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el partido",
      details: error.message,
    });
  }
};

export const updateMatchScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { localScore, visitorScore, status, penaltyScore } = req.body;

    const updateData = {
      "score.local": localScore,
      "score.visitor": visitorScore,
      status: status || "finished",
    };

    if (penaltyScore) {
      updateData["penaltyScore.local"] = penaltyScore.local ?? 0;
      updateData["penaltyScore.visitor"] = penaltyScore.visitor ?? 0;
    }

    const updatedMatch = await Match.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("local visitor", "name logo");

    if (!updatedMatch) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }

    res.status(200).json({
      message: "Marcador actualizado exitosamente",
      match: updatedMatch,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el marcador",
      details: error.message,
    });
  }
};

// Eliminar un partido
export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMatch = await Match.findByIdAndDelete(id);

    if (!deletedMatch) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }

    res.status(200).json({ message: "Partido eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el partido", details: error.message });
  }
};

// Obtener partidos por categoría
export const getMatchesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const matches = await matchsModel
      .find({ category })
      .populate("local", "name logo")
      .populate("visitor", "name logo")
      .sort({ date: 1 });

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener partidos por categoría",
      details: error.message,
    });
  }
};

// Obtener partidos por equipo (tanto local como visitante)
export const getMatchesByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const matches = await Match.find({
      $or: [{ local: teamId }, { visitor: teamId }],
    })
      .populate("local", "name logo")
      .populate("visitor", "name logo")
      .sort({ date: 1 });

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener partidos por equipo",
      details: error.message,
    });
  }
};

export const getLiveMatches = async (req, res) => {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneWeekAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const liveStatuses = [
      "first_half",
      "extra_time",
      "second_half",
      "penalties",
      "halftime",
    ];

    const liveMatches = await Match.find({
      $or: [
        { status: { $in: liveStatuses } }, // En juego
        { status: "pending", date: { $lte: oneWeekAhead } }, // Próximos 7 días
        { status: "finished", date: { $gte: oneWeekAgo } }, // Finalizados recientemente
        { status: "postponed" },
        { status: "canceled" },
        { status: "suspended" },
      ],
    })
      .populate("local", "name logo")
      .populate("visitor", "name logo")
      .sort({ status: -1, date: 1 });

    res.status(200).json(liveMatches);
  } catch (error) {
    console.error("Error en getLiveMatches:", error);
    res.status(500).json({
      error: "Error al obtener partidos en vivo",
      details: error.message,
    });
  }
};
