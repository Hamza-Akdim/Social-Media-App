import express from "express";
import logger from "./middlewares/logger.mjs"
import { errorHandler, notFound } from "./middlewares/errors.mjs";
import 'dotenv/config';
import connectToDB from "./config/db.mjs";
import bodyParser from "body-parser";
import userRouter from "./routers/user-routes.mjs";
import helmet from "helmet";
import cors from "cors";


// connection to DB
connectToDB();

// Init App
const app = express();

// Apply middlewares
app.use(express.json());
app.use(logger); // To see the URL, req methode/protocol in console
app.use(bodyParser.json());

// helmet
app.use(helmet())

// cors policy
app.use(cors())

// route
app.use("/api/users", userRouter);

// Error handler middlewares
app.use(notFound);
app.use(errorHandler);

// create server
const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
