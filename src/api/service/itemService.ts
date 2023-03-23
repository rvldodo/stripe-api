import Items from "../models/items";

class ItemService {
	static async createItem(item: string, price: number) {
		return await Items.create({ item, price });
	}

	static async findAllItems() {
		return await Items.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findItemById(id: string) {
		return await Items.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteItemById(id: string) {
		return await Items.destroy({
			where: { id },
		});
	}
}

export default ItemService;
