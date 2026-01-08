import { Request, Response, NextFunction } from "express";
import { ticketsService } from "../services/tickets.service";

export const ticketsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id as string;
      const ticket = await ticketsService.create(userId, req.body);
      res.status(201).json({ ok: true, ticket });
    } catch (e) {
      next(e);
    }
  },

  listMine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id as string;
      const tickets = await ticketsService.listMine(userId);
      res.status(200).json({ ok: true, tickets });
    } catch (e) {
      next(e);
    }
  },

  getMineById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id as string;
      const ticket = await ticketsService.getMineById(userId, req.params.id);
      res.status(200).json({ ok: true, ticket });
    } catch (e) {
      next(e);
    }
  }
};
