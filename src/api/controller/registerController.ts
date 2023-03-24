import bcrypt from "bcrypt";
import { Request, Response } from "express";
import AppError from "../helpers/appError";
import BalanceService from "../service/balanceService";
import UserService from "../service/userService";

class registerController {
	static async register(req: Request, res: Response): Promise<Response> {
		const { firstName, middleName, lastName, email, password, deposit } =
			req.body;

		const balance = await BalanceService.createBalance(deposit);

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await UserService.createUser(
			firstName,
			middleName,
			lastName,
			email,
			hashedPassword,
			balance.id
		);

		if (!user) {
			throw new AppError(400, "Cannot register user", 400);
		}

		return res.status(201).json({ message: "User registered" });
	}
}

export default registerController;
