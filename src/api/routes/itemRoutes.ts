import { Router } from "express";
import ItemController from "../controller/itemController";
import { adminRole, authorization } from "../middleware/auth";
import errorMiddleware from "../middleware/errorMiddleware";
import tryCatch from "../utils/tryCatch";
const router = Router();

router.post("/", authorization, adminRole, tryCatch(ItemController.createItem));

router.get("/", authorization, tryCatch(ItemController.getAllItems));

router.get("/:id", authorization, tryCatch(ItemController.getItemById));

router.put(
	"/:id",
	authorization,
	adminRole,
	tryCatch(ItemController.updateItem)
);

router.delete(
	"/:id",
	authorization,
	adminRole,
	tryCatch(ItemController.deleteItemById)
);

router.use(errorMiddleware);

export default router;
