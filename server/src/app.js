import express from "express";

import cors from "cors";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";

import * as dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

import mongoose from "mongoose";

import ExpressError from "./utils/ExpressError.js";

import listingRouter from "./routes/listing.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import reviewRouter from "./routes/review.routes.js";

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/AirBnB";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi i am root");
});

app.use("/api/listings", listingRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listings/:id/reviews", reviewRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server started at 8080");
});
