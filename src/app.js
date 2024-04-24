import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"
import routes from "./routes/index.routes.js"

const app = express();
app.use(cors())
app.use(express.urlencoded())
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/sc",routes)


export default app;
