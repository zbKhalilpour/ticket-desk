import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { env } from "../config/env";

type RegisterInput = { name: string; email: string; password: string };
type LoginInput = { email: string; password: string };

function signAccessToken(payload: object) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN
  });
}

function toSafeUser(user: { id: string; name: string; email: string; role: any; createdAt: Date }) {
  return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
}

export const authService = {
  async register(input: RegisterInput) {
    const name = (input?.name ?? "").trim();
    const email = (input?.email ?? "").trim().toLowerCase();
    const password = input?.password ?? "";

    if (!name || !email || !password) throw new AppError("name, email, password are required", 400);
    if (password.length < 8) throw new AppError("password must be at least 8 characters", 400);

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new AppError("Email already in use", 409);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, passwordHash }
    });

    return toSafeUser(user);
  },

  async login(input: LoginInput) {
    const email = (input?.email ?? "").trim().toLowerCase();
    const password = input?.password ?? "";

    if (!email || !password) throw new AppError("email and password are required", 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("Invalid credentials", 401);

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new AppError("Invalid credentials", 401);

    const accessToken = signAccessToken({ sub: user.id, role: user.role });

    return {
      accessToken,
      user: toSafeUser(user)
    };
  }
};
