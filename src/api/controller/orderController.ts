import { Request, Response } from "express";
import AppError from "../helpers/appError";
import ExtractToken from "../helpers/helper";
import BalanceService from "../service/balanceService";
import ItemService from "../service/itemService";
import OrderService from "../service/orderService";
import UserService from "../service/userService";

class orderController {
	static async createOrder(req: Request, res: Response): Promise<Response> {
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
			throw new AppError(204, "No user found", 400);
		}

		const { balanceId } = user;
		const balance = await BalanceService.findBalanceById(balanceId);

		if (!balance) {
			throw new AppError(204, "No balance found", 400);
		}

		const { itemId, quantity } = req.body;

		const item = await ItemService.findItemById(itemId);

		if (!item) {
			throw new AppError(400, "Item not found", 404);
		}

		const { price } = item;

		const totalPrice = Number((price * quantity).toFixed(2));

		if (totalPrice > balance.balance) {
			return res.json({
				message: "Balance is not enough",
				totalBalance: Number(balance.balance.toFixed(2)),
			});
		}

		balance.balance -= totalPrice;
		await balance.save();

		const order = await OrderService.createOrder(
			itemId,
			quantity,
			totalPrice,
			id
		);

		if (!order) {
			throw new AppError(400, "Cannot create order", 400);
		}

		const newOrder = {
			item: item.item,
			itemPrice: item.price,
			quantity,
			totalPrice,
		};

		return res.status(201).json({ order: newOrder });
	}

	static async getAllOrders(req: Request, res: Response): Promise<Response> {
		const bearer = req.headers["authorization"];
		const token = bearer?.split(" ")[1];
		if (!token) {
			throw new AppError(403, "Unauthorized", 400);
		}

		const body = ExtractToken(token);
		if (!body) {
			throw new AppError(204, "Token is empty", 400);
		}
		const { id, roleId } = body;
		let orders;
		let newOrder: any = {};
		if (roleId === 1) {
			orders = await OrderService.findAllOrders();
		} else if (roleId === 2) {
			const ordersUser = await OrderService.findAllOrdersByUserId(id);

			let cost = 0;
			for (let i = 0; i < ordersUser.length; i++) {
				cost += ordersUser[i].totalPrice;
			}

			newOrder.orders = ordersUser;
			newOrder.totalPrice = Number(cost.toFixed(2));
			return res.status(200).json({ orders: newOrder });
		}

		if (!orders) {
			throw new AppError(204, "No orders found", 400);
		}

		return res.status(200).json({ orders });
	}

	static async getOrderById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const order = await OrderService.findOrderById(id);

		if (!order) {
			throw new AppError(404, "Order not found", 404);
		}

		return res.status(200).json({ order });
	}

	static async updateOrder(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { itemId, quantity } = req.body;

		const itemPrice = await ItemService.findItemById(itemId);

		if (!itemPrice) {
			throw new AppError(404, "Item not found", 404);
		}

		const { price } = itemPrice;

		const order = await OrderService.findOrderById(id);

		if (!order) {
			throw new AppError(404, "Order not found to update", 404);
		}

		order.itemId = itemId;
		order.quantity = quantity;
		order.totalPrice = Number((price * quantity).toFixed(2));

		await order.save();

		return res.status(200).json({
			message: "Order updated",
		});
	}

	static async deleteOrderById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deleted = await OrderService.deleteOrderById(id);
		if (!deleted) {
			throw new AppError(400, "Cannot delete order", 400);
		}

		return res.status(200).json({
			message: "Order deleted",
		});
	}
}

export default orderController;
