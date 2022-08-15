import { Router } from "express";
import "express-async-errors"
import errorHandlingMiddleware from "../middlewares/errorHandler.js";
import authRouter from "./authRouter.js";
import foodRouter from "./foodRouter.js";

const router = Router();

router.use(authRouter)
router.use(foodRouter)
router.use(errorHandlingMiddleware)

export default router;