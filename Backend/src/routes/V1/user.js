import express from "express";
import { createUser, me, signin, signup } from "../../controllers/userController.js";
import { zodSignupSchema } from "../../validators/zodSignupSchema.js";
import { validate } from "../../validators/zodValidator.js";
import { zodSigninSchema } from "../../validators/zodSigninSchema.js";
import { isAuthenticated } from "../../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/", createUser);

router.post("/signup", validate(zodSignupSchema) ,signup);
router.post("/signin",validate(zodSigninSchema) ,signin);
router.get("/me", isAuthenticated, me);

export default router;