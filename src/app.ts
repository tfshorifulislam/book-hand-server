import express from "express";
import cors from "cors";
import homeRouter from './Routes/home.route.js';
import booksRouter from './Routes/books.route.js';
import userIdProfile from './Routes/userId.Profile.Route.js';


const app = express();
app.use(cors({ origin: process.env.NEXT_PUBLIC_FRONTEND_URL, credentials: true, }));
app.use(express.json());

// Home route
app.use("/", homeRouter);

//get books route;
app.use('/api', booksRouter);

//get user profile;
app.use('/api' , userIdProfile)

export default app;