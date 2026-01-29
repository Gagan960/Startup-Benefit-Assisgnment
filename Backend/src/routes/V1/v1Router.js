import express from "express";
import userRouter from "./user.js";
import dealRouter from "./deal.js";
import claimRouter from "./claim.js";
const router = express.Router();

router.use("/user", userRouter);// if in the remaining url i.e after /api , we have the url 
// starting with /user , then the request  is forwarded to userRouter

router.use("/deals", dealRouter);
router.use("/claims", claimRouter);

export default router;