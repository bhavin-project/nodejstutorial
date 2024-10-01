// import { connectDB } from "./db/connect.js";

// const startApp = async () => {
//   try {
//     await connectDB();
//   } catch (error) {
//     console.error(`Fail to start ${error}`);
//   }
// };

// startApp();

// const express = require("express");
import express from "express";
const app = express();
// const tasks = require("./routes/tasks");
import tasks from "./routes/tasks.js";

// const connectDB = require("./db/connect");
import { connectDB } from "./db/connect.js";
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
// const notFound = require("./middleware/not-found");
import { notFound } from "./middleware/not-found.js";
// const errorHandlerMiddleware = require("./middleware/error-handler.js");
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

// middleware

app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
