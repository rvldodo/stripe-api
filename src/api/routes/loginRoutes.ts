import { Router } from "express";
import loginController from "../controller/loginController";
import errorMiddleware from "../middleware/errorMiddleware";
import tryCatch from "../utils/tryCatch";
const router = Router();

router.post("/", tryCatch(loginController.login));

router.use(errorMiddleware);

export default router;
