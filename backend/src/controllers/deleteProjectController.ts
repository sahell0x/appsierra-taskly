import { Request, Response } from "express";
import Project from "../db_models/projectModel";
import Task from "../db_models/taskModel";

const deleteProjectController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const projectId = req.query.projectId;
    const userId = req.userId;



    const response = await Project.findOneAndDelete({
        $and:[
            {_id:projectId},
            {userId:userId},
        ]
    });
    if (!response) {
      return res.status(400).json({
        message: "can't delete project",
      });
    }

    await Task.deleteMany({
        projectId:projectId,
    });

    return res.status(200).json({
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

export default deleteProjectController;
