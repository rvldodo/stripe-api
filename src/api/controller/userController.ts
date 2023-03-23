import { Request, Response } from "express";
import AppError from "../helpers/appError";
import UserService from "../service/userService";

class userController {
	static async getAllUsers(req: Request, res: Response): Promise<Response> {
		const users = await UserService.findAllUsers();

		if (!users) {
			throw new AppError(204, "There are no users", 404);
		}

		return res.status(200).json({ users });
	}

	static async getUserById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const user = await UserService.findUserById(id);
		if (!user) {
			throw new AppError(404, "User not found", 400);
		}

		return res.status(200).json({ user });
	}

	static async updateUser(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { firstName, middleName, lastName } = req.body;
		const user = await UserService.findUserById(id);

		if (!user) {
			throw new AppError(404, "User not found", 400);
		}

		user.firstName = firstName;
		user.middleName = middleName;
		user.lastName = lastName;

		await user.save();

		return res.status(200).json({
			message: "User updated",
		});
	}

	static async deleteUser(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const deleted = await UserService.deleteUserById(id);

		if (!deleted) {
			throw new AppError(404, "Cannot delete user", 400);
		}

		return res.json({
			message: "User deleted",
		});
	}
}

export default userController;
