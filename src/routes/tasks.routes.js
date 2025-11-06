import { Router } from "express";
import { createTask, listTasks, getTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";
const router = Router();
router.post("/", createTask);
router.get("/", listTasks);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
export default router;
