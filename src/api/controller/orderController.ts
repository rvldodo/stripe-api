import { Request, Response } from "express";
import AppError from "../helpers/appError";
import OrderService from "../service/orderService";

class orderController {
	static async createOrder(req: Request, res: Response): Promise<Response> {
		const { itemId, quantity, totalPrice } = req.body;

		const order = await OrderService.createOrder(itemId, quantity, totalPrice);

		if (!order) {
			throw new AppError(400, "Cannot create order", 400);
		}

		return res.status(201).json({ order });
	}

	static async getAllOrders(req: Request, res: Response): Promise<Response> {
		const orders = await OrderService.findAllOrders();

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
		const { itemId, quantity, totalPrice } = req.body;

		const order = await OrderService.findOrderById(id);

		if (!order) {
			throw new AppError(404, "Order not found to update", 404);
		}

		order.itemId = itemId;
		order.quantity = quantity;
		order.totalPrice = totalPrice;

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
