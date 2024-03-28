import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/user-routes.mjs";

const app = express();
const PORT = process.env.PORT || 5003;

app.use(bodyParser.json());

app.use("/api/users", userRouter);

app.get("/", (req, res, next) => {
  res.send("yassine-bg-2002");
});

app.use((req, res, next) => {
  const error = new Error("Could not find page");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});

mongoose
  .connect("mongodb://localhost:27017/proji_fidirateur")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
