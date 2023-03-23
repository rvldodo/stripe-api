import { Router } from "express";
import userController from "../controller/userController";
import authorization from "../middleware/auth";
import errorMiddleware from "../middleware/errorMiddleware";
import tryCatch from "../utils/tryCatch";
const router = Router();

router.get("/", authorization, tryCatch(userController.getAllUsers));

router.get("/:id", authorization, tryCatch(userController.getUserById));

router.put("/:id", authorization, tryCatch(userController.updateUser));

router.delete("/:id", authorization, tryCatch(userController.deleteUser));

router.use(errorMiddleware);

export default router;
