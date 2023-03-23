import { Router } from "express";
import userController from "../controller/userController";
import { adminRole, authorization } from "../middleware/auth";
import errorMiddleware from "../middleware/errorMiddleware";
import tryCatch from "../utils/tryCatch";
const router = Router();

router.get("/", authorization, adminRole, tryCatch(userController.getAllUsers));

router.get(
	"/:id",
	authorization,
	adminRole,
	tryCatch(userController.getUserById)
);

router.put(
	"/:id",
	authorization,
	adminRole,
	tryCatch(userController.updateUser)
);

router.delete(
	"/:id",
	authorization,
	adminRole,
	tryCatch(userController.deleteUser)
);

router.use(errorMiddleware);

export default router;
