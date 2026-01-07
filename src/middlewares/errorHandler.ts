import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const isAppError = err instanceof AppError;

  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal Server Error";

  if (!isAppError) {
    console.error(err);
  }

  res.status(statusCode).json({
    ok: false,
    message
  });
}
