import authRoutes from "./auth.routes.js";
import noticiaRoutes from "./noticias.routes.js";
import teamRoutes from "./teams.routes.js";
import playerRoutes from "./players.routes.js";
import { Router } from "express"
const app = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
app.get("/", (req, res) => {
  res.send("GET de prueba / sola con deploy");
});





app.use("/sc/auth", authRoutes);
app.use("/sc/notices", noticiaRoutes);
app.use("/sc/", teamRoutes);
app.use("/sc/", playerRoutes);

export default app

