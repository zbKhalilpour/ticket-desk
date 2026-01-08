import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { requireRole } from "../middlewares/requireRole";
import { adminController } from "../controllers/admin.controller";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("ADMIN"));

adminRouter.get("/tickets", adminController.listAllTickets);
adminRouter.patch("/tickets/:id/status", adminController.updateTicketStatus);
