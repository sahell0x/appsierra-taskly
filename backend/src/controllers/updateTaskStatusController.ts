import { Request, Response } from "express";
import Task from "../db_models/taskModel";

const updateTaskStatusController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const taskId = req.body.taskId;
    const status = req.body.status;
    const completedAt = req.body.completedAt;
    const userId = req.userId;

    const task = await Task.findOneAndUpdate(
      { $and: [{ _id: taskId }, { userId }] },
      { status, completedAt }
    );

    if (!task) {
      return res.status(403).json({
        message: "Cant update task status",
      });
    }

    return res.status(200).json({
      message: "Task status updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export default updateTaskStatusController;
