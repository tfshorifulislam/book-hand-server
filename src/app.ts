import express from "express";
import cors from "cors";

import homeRouter from './Routes/home.route.js'

const app = express();


app.use(
    cors({
        origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());

// Home route
app.use("/", homeRouter);


export default app;