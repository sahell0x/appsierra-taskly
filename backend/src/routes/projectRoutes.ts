import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import createProjectController from "../controllers/createProjectController";
import createProjectMiddleware from "../middlewares/createProjectMiddleware";
import getProjectsController from "../controllers/getProjectsControllers";
import deleteProjectController from "../controllers/deleteProjectController";

const projectRoutes = Router();

projectRoutes.post("/project",authMiddleware,createProjectMiddleware,createProjectController);
projectRoutes.get("/project",authMiddleware,getProjectsController);
projectRoutes.delete("/project",authMiddleware,deleteProjectController);

export default projectRoutes;