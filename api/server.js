const express = require("express");
const logger = require("./middlewares/logger.js");
const { errorHandler, notFound } = require("./middlewares/errors.js");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./config/db.js");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

// routes Path
const userRoutes = require("./routers/user-routes.js");
const authRoutes = require("./routers/authentication-routes.js");
const postsRoutes = require("./routers/post-routes.js");
const chatRoute = require("./routers/chat-routes")

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
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/chat", chatRoute);


// // Error handler middlewares
app.use(notFound);
app.use(errorHandler);

// create server
const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
