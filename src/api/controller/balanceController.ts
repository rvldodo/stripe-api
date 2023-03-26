import dotenv from "dotenv";
import { Request, Response } from "express";
import AppError from "../helpers/appError";
import ExtractToken from "../helpers/helper";
import BalanceService from "../service/balanceService";
import UserService from "../service/userService";
dotenv.config();

class BalanceController {
	static async deposit(req: Request, res: Response): Promise<Response> {
		const bearer = req.headers["authorization"];
		const token = bearer?.split(" ")[1];
		if (!token) {
			throw new AppError(403, "Unauthorized", 400);
		}

		const { deposit } = req.body;

		const body = ExtractToken(token);
		if (!body) {
			throw new AppError(204, "Token is empty", 400);
		}
		const { id } = body;
		const user = await UserService.findUserById(id);

		if (!user) {
			throw new AppError(404, "User not found", 404);
		}

		const { balanceId } = user;
		const oldBalance = await BalanceService.findBalanceById(balanceId);

		if (!oldBalance) {
			throw new AppError(404, "Balance not found", 404);
		}

		oldBalance.balance += Number(deposit);

		await oldBalance.save();

		return res.status(200).json({
			Deposit: `${deposit / 100}$`,
			Total_Balance: `${oldBalance.balance / 100}$`,
		});
	}

	static async withdraw(req: Request, res: Response): Promise<Response> {
		const bearer = req.headers["authorization"];
		const token = bearer?.split(" ")[1];
		if (!token) {
			throw new AppError(403, "Unauthorized", 400);
		}

		const { withdraw } = req.body;

		const body = ExtractToken(token);
		if (!body) {
			throw new AppError(204, "Token is empty", 400);
		}
		const { id } = body;
		const user = await UserService.findUserById(id);

		if (!user) {
			throw new AppError(404, "User not found", 404);
		}

		const { balanceId } = user;
		const oldBalance = await BalanceService.findBalanceById(balanceId);

		if (!oldBalance) {
			throw new AppError(404, "Balance not found", 404);
		}

		oldBalance.balance -= Number(withdraw);

		await oldBalance.save();

		return res.status(200).json({
			Withdraw: `${withdraw / 100}$`,
			Total_Balance: `${oldBalance.balance / 100}$`,
		});
	}

	static async checkBalance(req: Request, res: Response): Promise<Response> {
		const bearer = req.headers["authorization"];
		const token = bearer?.split(" ")[1];
		if (!token) {
			throw new AppError(403, "Unauthorized", 400);
		}

		const body = ExtractToken(token);
		if (!body) {
			throw new AppError(204, "Token is empty", 400);
		}
		const { id } = body;
		const user = await UserService.findUserById(id);

		if (!user) {
			throw new AppError(404, "User not found", 404);
		}

		const { balanceId } = user;
		const balance = await BalanceService.findBalanceById(balanceId);

		if (!balance) {
			throw new AppError(404, "Balance not found", 404);
		}

		return res.status(200).json({
			Balance: `${balance.balance / 100}$`,
		});
	}
}

export default BalanceController;
