import { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError";

export const handleErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      code: err.statusCode,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    code: 500,
    message: "Internal server Error",
  });
};
