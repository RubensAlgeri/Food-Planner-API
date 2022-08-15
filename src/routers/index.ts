import { Router } from "express";
import "express-async-errors"
import errorHandlingMiddleware from "../middlewares/errorHandler.js";
import authRouter from "./authRouter.js";
import foodRouter from "./foodRouter.js";
import testsRouter from "./testsRouter.js";

const router = Router();

router.use(authRouter)
router.use(foodRouter)
if (process.env.NODE_ENV === "test") {
	router.use(testsRouter);
}
router.use(errorHandlingMiddleware)

export default router;