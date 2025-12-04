import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db.js";
import projectsRouter from "./routes/projects.routes.js";
import tasksRouter from "./routes/tasks.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true, service: "projects-tasks-api" }));

app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB({ uri: process.env.MONGODB_URI, dbName: process.env.DB_NAME });
  app.listen(PORT, () => console.log(`🚀 Server listening on :${PORT}`));
};
start();
