import express from "express";
import cors from "cors";
import homeRouter from "./Routes/home.route.js";
import authRouter from "./Routes/auth.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.use(express.json());

// Home route
app.use("/", homeRouter);

// Auth route
app.use("/auth", authRouter);

export default app;