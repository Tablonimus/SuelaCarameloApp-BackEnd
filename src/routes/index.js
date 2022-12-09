const { Router } = require("express");

const noticesRoutes = require("./noticesRoutes");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  res.send("GET de prueba / sola con deploy");
});

router.use("/notices", noticesRoutes);

module.exports = router;
