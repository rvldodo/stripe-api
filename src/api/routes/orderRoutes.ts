import { Router } from "express";
import orderController from "../controller/orderController";
import { adminRole, authorization } from "../middleware/auth";
import errorMiddleware from "../middleware/errorMiddleware";
import tryCatch from "../utils/tryCatch";
const router = Router();

router.post("/", authorization, tryCatch(orderController.createOrder));

router.get(
	"/",
	authorization,
	adminRole,
	tryCatch(orderController.getAllOrders)
);

router.get(
	"/:id",
	authorization,
	adminRole,
	tryCatch(orderController.getOrderById)
);

router.put(
	"/:id",
	authorization,
	adminRole,
	tryCatch(orderController.updateOrder)
);

router.delete(
	"/:id",
	authorization,
	adminRole,
	tryCatch(orderController.deleteOrderById)
);

router.use(errorMiddleware);

export default router;
