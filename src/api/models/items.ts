import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../../config/dbConnect";
import ItemsInterface from "../interfaces/itemsInterface";
import Orders, { OrderInput } from "./orders";

export interface ItemInput extends Optional<ItemsInterface, "id"> {}
export interface ItemOutput extends Required<ItemsInterface> {}

class Items extends Model<ItemsInterface, ItemInput> implements ItemsInterface {
	public id!: number;
	public item!: string;
	public price!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Items.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		item: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.INTEGER,
		},
	},
	{ sequelize: dbConnect, underscored: false, timestamps: true }
);

export default Items;
