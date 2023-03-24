import Roles from "../models/roles";
import Users from "../models/users";

class UserService {
	static async createUser(
		firstName: string,
		middleName: string,
		lastName: string,
		email: string,
		password: string,
		balanceId: number
	) {
		return await Users.create({
			firstName,
			middleName,
			lastName,
			email,
			password,
			balanceId,
		});
	}

	static async findAllUsers() {
		return await Users.findAll({
			include: [
				{
					model: Roles,
					as: "role",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "password"],
			},
		});
	}

	static async findUserById(id: string) {
		return await Users.findByPk(id, {
			include: [
				{
					model: Roles,
					as: "role",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt", "password"],
			},
		});
	}

	static async findUserByEmail(email: string) {
		return await Users.findOne({
			where: { email },
			include: [
				{
					model: Roles,
					as: "role",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteUserById(id: string) {
		return await Users.destroy({
			where: { id },
		});
	}
}

export default UserService;
