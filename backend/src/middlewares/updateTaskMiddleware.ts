import { Request, Response, NextFunction } from "express";
import updateTaskType from "../zod_types/updateTaskTypes";

const updateTaskMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const payload = req.body.payload;
  const { success } = updateTaskType.safeParse(payload);

  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }
  next();
};

export default updateTaskMiddleware;
