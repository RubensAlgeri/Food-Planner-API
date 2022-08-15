import { Router } from "express";

import * as controller from "../controllers/foodController.js";
import schemaValidator from "../middlewares/schemaValidatorMiddleware.js"
import * as schema from "../schemas/foodSchema.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const foodRouter = Router();
foodRouter.post('/food',validateToken, schemaValidator(schema.foodSchema), controller.)
foodRouter.get('/food', validateToken, controller.)
foodRouter.get('/food', validateToken, controller.)

export default foodRouter;