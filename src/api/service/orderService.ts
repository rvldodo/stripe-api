import Items from "../models/items";
import Orders from "../models/orders";
import Users from "../models/users";

class OrderService {
	static async createOrder(
		itemId: number,
		quantity: number,
		totalPrice: number,
		userId: number
	) {
		return await Orders.create({
			itemId,
			quantity,
			totalPrice,
			userId,
		});
	}

	static async findAllOrders() {
		return await Orders.findAll({
			include: [
				{
					model: Items,
					as: "item",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: Users,
					as: "user",
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

	static async findOrderById(id: string) {
		return await Orders.findOne({
			where: { id },
			include: [
				{
					model: Items,
					as: "item",
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
	static async findAllOrdersByUserId(userId: number) {
		return await Orders.findAll({
			where: { userId },
			include: [
				{
					model: Items,
					as: "item",
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

	static async deleteOrderById(id: string) {
		return await Orders.destroy({
			where: { id },
		});
	}
}

export default OrderService;
