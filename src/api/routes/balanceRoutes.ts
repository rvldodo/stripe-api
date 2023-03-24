import { Router } from "express";
import BalanceController from "../controller/balanceController";
import { authorization } from "../middleware/auth";
import errorMiddleware from "../middleware/errorMiddleware";
import tryCatch from "../utils/tryCatch";
const router = Router();

router.get("/check", authorization, tryCatch(BalanceController.checkBalance));

router.put("/deposit", authorization, tryCatch(BalanceController.deposit));

router.put("/withdraw", authorization, tryCatch(BalanceController.withdraw));

router.use(errorMiddleware);

export default router;
