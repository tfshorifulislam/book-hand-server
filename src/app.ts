import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import passport from "./Config/passport.js";
import homeRouter from "./Routes/home.route.js";
import getMeRouter from "./Routes/getMe.route.js";
import authRouter from "./Routes/Authentication_Route.ts/auth.route.js";
import logout from "./Routes/Authentication_Route.ts/logout.route.js";
import login from "./Routes/Authentication_Route.ts/login.router.js";
import refreshRouter from "./Routes/Authentication_Route.ts/refresh.route.js";
import googleRouter from "./Routes/Authentication_Route.ts/google.route.js";
import forgotPasswordRouter from "./Routes/Authentication_Route.ts/forgotPassword.route.js";
import resetPasswordRouter from "./Routes/Authentication_Route.ts/reset.Password.route.js";

const app = express();
app.use(cookieParser());
app.use(passport.initialize());

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

app.use("/api/auth", googleRouter);

app.use("/api/auth", forgotPasswordRouter);

app.use("/api/auth", resetPasswordRouter);

export default app;