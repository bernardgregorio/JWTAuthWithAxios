import express from "express";
import { checkSchema } from "express-validator";

import UserController from "../controllers/user.js";
import { createUserSchema } from "../validations/user.js";
import { authJWT } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", UserController.getAllUsers);
router
  .route("/:id")
  .get(UserController.findUserById)
  .put(checkSchema(createUserSchema), UserController.updateUser)
  .patch(UserController.updateUser);

export default router;
