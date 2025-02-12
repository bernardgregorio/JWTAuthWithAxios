import express from "express";
import { checkSchema } from "express-validator";
import AuthController from "../controllers/auth.js";
import { createUserSchema } from "../validations/user.js";
import { authJWT } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/register",
  checkSchema(createUserSchema),
  AuthController.register
);

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refreshToken", AuthController.refreshToken);

export default router;
