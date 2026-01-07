import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ ok: true, user });
    } catch (e) {
      next(e);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({ ok: true, ...result });
    } catch (e) {
      next(e);
    }
  },

  me: async (req: Request, res: Response) => {
    res.status(200).json({ ok: true, user: (req as any).user });
  }
};
