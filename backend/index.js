import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/passportJWT.js";

import corsOptions from "./config/corsOption.js";
import db from "./config/db.js";

import UserRoute from "./routes/user.js";
import AuthRoute from "./routes/auth.js";
import { authJWT } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./utils/loggerUtils.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// connect to database
db();

//cookie parser and passport middleware
app.use(cookieParser());
app.use(passport.initialize());

// log incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// auth routes
app.use("/api/auth", AuthRoute);

//middleware for auth
app.use(authJWT);

// user routes
app.use("/api/user", UserRoute);

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ errors: "Route not found" });
});

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  logger.info(`Server running on:`);
  logger.info(`- Local: http://localhost:${process.env.PORT}`);
});
