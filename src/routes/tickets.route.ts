import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { ticketsController } from "../controllers/tickets.controller";

export const ticketsRouter = Router();

ticketsRouter.use(requireAuth);

ticketsRouter.post("/", ticketsController.create);
ticketsRouter.get("/", ticketsController.listMine);
ticketsRouter.get("/:id", ticketsController.getMineById);
