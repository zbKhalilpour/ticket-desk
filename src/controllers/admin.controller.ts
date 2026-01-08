import { Request, Response, NextFunction } from "express";
import { adminService } from "../services/admin.service";

export const adminController = {
  listAllTickets: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tickets = await adminService.listAllTickets();
      res.status(200).json({ ok: true, tickets });
    } catch (e) {
      next(e);
    }
  },

  updateTicketStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticket = await adminService.updateTicketStatus(req.params.id, req.body);
      res.status(200).json({ ok: true, ticket });
    } catch (e) {
      next(e);
    }
  }
};
