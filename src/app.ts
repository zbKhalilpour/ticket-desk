import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { healthRouter } from "./routes/health.route";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./routes/auth.route";


export const app = express();

app.use(helmet());
// app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/health", healthRouter);
app.use("/auth", authRouter);


// 404 + error handler
app.use(notFound);
app.use(errorHandler);
