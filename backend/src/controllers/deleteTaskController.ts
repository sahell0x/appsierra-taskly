import { Request, Response } from "express";
import Task from "../db_models/taskModel";

const deleteTaskController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    const taskId = req.query.taskId;
    const userId = req.userId;


    const task = await Task.findOneAndDelete({$and:[
      {_id:taskId},
      {userId},
    ]});


    if(!task){
        return res.status(403).json({
            message:"Cant delete task "
        })
    }


    return res.status(200).json({
        message:"Task deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default deleteTaskController;
