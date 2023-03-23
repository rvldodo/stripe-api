import { Request, Response } from "express";
import AppError from "../helpers/appError";
import ItemService from "../service/itemService";

class ItemController {
	static async createItem(req: Request, res: Response): Promise<Response> {
		const { item, price } = req.body;

		const newItem = await ItemService.createItem(item, price);

		if (!newItem) {
			throw new AppError(400, "Cannot create item", 400);
		}

		return res.status(201).json({ item: newItem });
	}

	static async getAllItems(req: Request, res: Response): Promise<Response> {
		const items = await ItemService.findAllItems();

		if (!items) {
			throw new AppError(400, "Cannot find items", 400);
		}

		return res.status(200).json({ items });
	}

	static async getItemById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const item = await ItemService.findItemById(id);
		if (!item) {
			throw new AppError(404, "Item not found", 404);
		}

		return res.status(200).json({ item });
	}

	static async updateItem(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { item, price } = req.body;

		const newItem = await ItemService.findItemById(id);

		if (!newItem) {
			throw new AppError(404, "Item not found", 404);
		}

		newItem.item = item;
		newItem.price = price;

		await newItem.save();

		return res.status(200).json({ message: "Item updated" });
	}

	static async deleteItemById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deleted = await ItemService.deleteItemById(id);

		if (!deleted) {
			throw new AppError(400, "Bad request", 400);
		}

		return res.status(200).json({ message: "Item deleted" });
	}
}

export default ItemController;
