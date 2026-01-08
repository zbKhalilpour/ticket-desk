import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

type CreateTicketInput = { title: string; description: string };

export const ticketsService = {
  async create(userId: string, input: CreateTicketInput) {
    const title = (input?.title ?? "").trim();
    const description = (input?.description ?? "").trim();

    if (!title || !description) throw new AppError("title and description are required", 400);

    return prisma.ticket.create({
      data: { userId, title, description }
    });
  },

  async listMine(userId: string) {
    return prisma.ticket.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  },

  async getMineById(userId: string, id: string) {
    const ticket = await prisma.ticket.findFirst({
      where: { id, userId }
    });

    if (!ticket) throw new AppError("Ticket not found", 404);
    return ticket;
  }
};
