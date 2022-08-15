import { Router } from "express";
import { resetDatabase } from "../controllers/foodController.js";

const testsRouter = Router();

testsRouter.post("/reset-database", resetDatabase);

export default testsRouter;