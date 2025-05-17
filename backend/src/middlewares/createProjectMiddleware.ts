import { Request, Response, NextFunction } from "express";
import projectTypes from "../zod_types/projectTypes";

const createProjectMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const body = req.body;
  const { success } = projectTypes.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }
  next();
};

export default createProjectMiddleware;
