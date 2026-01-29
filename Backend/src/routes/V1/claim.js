import express from "express";
import { claimDeal, getMyClaims } from "../../controllers/claimController.js";
import { isAuthenticated } from "../../middlewares/authmiddleware.js";
import { validate } from "../../validators/zodValidator.js";
import { zodClaimSchema } from "../../validators/zodClaimSchema.js";

const router = express.Router();

router.post("/", isAuthenticated, validate(zodClaimSchema), claimDeal);
router.get("/my", isAuthenticated, getMyClaims);

export default router;

