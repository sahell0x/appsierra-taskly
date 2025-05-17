import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import createTaskMiddleware from "../middlewares/createTaskMiddleware";
import createTaskController from "../controllers/createTaskController";
import deleteTaskController from "../controllers/deleteTaskController";
import updateTaskController from "../controllers/updateTaskController";
import updateTaskMiddleware from "../middlewares/updateTaskMiddleware";
import updateTaskStatusController from "../controllers/updateTaskStatusController";


const taskRoutes = Router();

taskRoutes.post("/task",authMiddleware,createTaskMiddleware,createTaskController);
taskRoutes.delete("/task",authMiddleware,deleteTaskController);
taskRoutes.patch("/task",authMiddleware,updateTaskMiddleware,updateTaskController);
taskRoutes.patch("/task/status",authMiddleware,updateTaskStatusController);

export default taskRoutes;