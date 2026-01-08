import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return next(new AppError("Unauthorized", 401));

    if (!roles.includes(user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
}
