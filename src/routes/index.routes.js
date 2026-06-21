import authRoutes from "./auth.routes.js";
import noticiaRoutes from "./notices.routes.js";
import teamRoutes from "./teams.routes.js";
import playerRoutes from "./players.routes.js";
import fixtureRoutes from "./fixture.routes.js";
import positionsRoutes from "./positions.routes.js";
import matchesRoutes from "./matchs.routes.js";
import heroSectionRoutes from "./heroSection.routes.js";
import sponsorRoutes from "./sponsors.routes.js";
import couponRoutes from "./coupons.routes.js";
import userRoutes from "./users.routes.js";
import configRoutes from "./config.routes.js";
import pageViewRoutes from "./pageViews.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import { Router } from "express";
const app = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
app.get("/", (req, res) => {
  res.send("GET de prueba / sola con deploy");
});

app.use("/auth", authRoutes);
app.use("/notices", noticiaRoutes);
app.use("/teams", teamRoutes);
app.use("/players", playerRoutes);
app.use("/fixtures", fixtureRoutes);
app.use("/positions", positionsRoutes);
app.use("/matches", matchesRoutes);
app.use("/hero-images", heroSectionRoutes);
app.use("/sponsors", sponsorRoutes);
app.use("/coupons", couponRoutes);
app.use("/users",   userRoutes);
app.use("/configs", configRoutes);
app.use("/pageviews", pageViewRoutes);
app.use("/analytics", analyticsRoutes);

export default app;
