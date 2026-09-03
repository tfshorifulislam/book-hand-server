import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import homeRouter from "./Routes/home.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.BETTER_AUTH_URL,
    credentials: true,
  })
);

app.all("/api/auth/*any", toNodeHandler(auth));

app.use(express.json());

// Home route
app.use("/", homeRouter);

export default app;