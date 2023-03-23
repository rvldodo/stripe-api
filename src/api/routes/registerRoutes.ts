import { Router } from "express";
import registerController from "../controller/registerController";
import errorMiddleware from "../middleware/errorMiddleware";
import tryCatch from "../utils/tryCatch";
const router = Router();

router.post("/", tryCatch(registerController.register));

router.use(errorMiddleware);

export default router;
