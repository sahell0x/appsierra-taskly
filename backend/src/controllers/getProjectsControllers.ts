import { Request, Response } from "express";
import Project from "../db_models/projectModel";
import Task from "../db_models/taskModel";

const getProjectsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    const userId = req.userId;

    const projects = await Project.find({userId});
    const tasks = await Task.find({userId});


    const formattedProjects = projects.map(project => {
      const { _id, ...rest } = project.toObject(); 
      return {
          id: _id,
          ...rest
      };
  });

const formattedTasks = tasks.map(task => {
    const { _id, ...rest } = task.toObject(); 
    return {
        id: _id,
        ...rest
    };
});
  
  return res.status(200).json({
      projects: formattedProjects,
      tasks:formattedTasks
  });

  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default getProjectsController;
