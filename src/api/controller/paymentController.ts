import dotenv from "dotenv";
import { Request, Response } from "express";
import Stripe from "stripe";
import AppError from "../helpers/appError";
import ExtractToken from "../helpers/helper";
import OrderService from "../service/orderService";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: "2022-11-15",
});

class PaymentController {
	static async payment(req: Request, res: Response): Promise<Response> {
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
		const orders = await OrderService.findAllOrdersByUserId(id);

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: orders.map((order) => {
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: order.item.item,
						},
						unit_amount: order.item.price,
					},
					quantity: order.quantity,
				};
			}),
			success_url: `${process.env.BASE_URL}/api/payment/success`,
			cancel_url: `${process.env.BASE_URL}/api/payment/cancel`,
		});

		return res.status(200).json({ url: (await session).url });
	}

	static async successPayment(req: Request, res: Response): Promise<Response> {
		return res.status(200).json({ message: "Payment successful" });
	}

	static async cancelPayment(req: Request, res: Response): Promise<Response> {
		return res.status(400).json({ message: "Payment failed" });
	}
}

export default PaymentController;
