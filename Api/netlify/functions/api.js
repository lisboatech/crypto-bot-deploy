const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use(cors());
app.options("*", cors());

const userRouter = require("../../Api/Routers/useRouter");
app.use("/api/v1/user", userRouter);
app.use("/api", userRouter);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log("DB connection successful!"));

module.exports.handler = serverless(app);
