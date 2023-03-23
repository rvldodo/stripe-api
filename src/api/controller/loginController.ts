import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../helpers/appError";
import Payload from "../interfaces/payload";
import UserService from "../service/userService";
dotenv.config();

class loginController {
	static async login(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		const user = await UserService.findUserByEmail(email);
		if (!user) {
			throw new AppError(404, "User not found", 400);
		}

		const verify = await bcrypt.compare(password, user.password);
		if (!verify) {
			throw new AppError(404, "Password is incorrect", 400);
		}

		const payload: Payload = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			roleId: user.roleId,
		};

		const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string);

		return res.status(200).json({ token });
	}
}

export default loginController;
