import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";

type UpdateStatusInput = { status: "OPEN" | "IN_PROGRESS" | "CLOSED" };

export const adminService = {
  async listAllTickets() {
    return prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    });
  },

  async updateTicketStatus(ticketId: string, input: UpdateStatusInput) {
    const status = input?.status;
    if (!status) throw new AppError("status is required", 400);

    const allowed = ["OPEN", "IN_PROGRESS", "CLOSED"];
    if (!allowed.includes(status)) throw new AppError("Invalid status", 400);

    const exists = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!exists) throw new AppError("Ticket not found", 404);

    return prisma.ticket.update({
      where: { id: ticketId },
      data: { status }
    });
  }
};
