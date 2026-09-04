import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import homeRouter from "./Routes/home.route.js";
import authRouter from "./Routes/auth.route.js";
import getMeRouter from "./Routes/getMe.route.js";
import logout from "./Routes/logout.route.js";
import login from "./Routes/login.router.js";
import refreshRouter from "./Routes/refresh.route.js";

const app = express();
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());

// Home route
app.use("/", homeRouter);

// Auth routes
app.use("/api/auth", authRouter);

app.use("/api", getMeRouter);

app.use("/api", logout);

app.use("/api", login);

app.use("/api/auth", refreshRouter);

export default app;