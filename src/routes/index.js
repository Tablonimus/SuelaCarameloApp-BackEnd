const { Router } = require("express");

const noticesRoutes = require("./noticesRoutes");
const teamsRoutes = require("./teamsRoutes");
const matchsRoutes = require("./matchsRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  res.send("GET de prueba / sola con deploy");
});

router.use("/notices", noticesRoutes);
router.use("/teams", teamsRoutes);
router.use("/matchs", matchsRoutes);

module.exports = router;
