import { Router } from "express";
import PaymentController from "../controller/paymentController";
import { authorization } from "../middleware/auth";
import errorMiddleware from "../middleware/errorMiddleware";
import tryCatch from "../utils/tryCatch";
const router = Router();

router.get("/", authorization, tryCatch(PaymentController.payment));

router.get("/success", PaymentController.successPayment);

router.get("/cancel", PaymentController.cancelPayment);

router.use(errorMiddleware);

export default router;
