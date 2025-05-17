import { Request, Response } from "express";
import Project from "../db_models/projectModel";

const createProjectController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const project = req.body;
    const userId = req.userId;

    project.userId = userId;

    const projects = await Project.find({userId});

    if(projects?.length >= 4){
      return  res.status(403).json({
            message:"You could only have 4 projects max",
        })
    }

    const response = await Project.create(project);
    if (!response) {
      return res.status(400).json({
        message: "can't create project",
      });
    }

    return res.status(201).json({
     id: response._id,
     name: response.name,
     userId :response.userId,
     createdAt:response.createdAt,
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default createProjectController;
