import express from "express";
import cors from "cors";
import homeRouter from './Routes/home.route.js';
import booksRouter from './Routes/books.route.js';
import userIdProfile from './Routes/userId.Profile.Route.js';
import sellBookRouter from './Routes/Sell_Book_route.js';
import booksDetailsRouter from './Routes/Book_Details_route.js';


const app = express();
app.use(cors({ origin: process.env.NEXT_PUBLIC_FRONTEND_URL, credentials: true, }));
app.use(express.json());

// Home route
app.use("/", homeRouter);

//get books route;
app.use('/api', booksRouter);

//get books details route;
app.use('/api', booksDetailsRouter);

//get user profile;
app.use('/api' , userIdProfile);

//post sell book router;
app.use('/api', sellBookRouter);


export default app;