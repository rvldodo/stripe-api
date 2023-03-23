import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../../config/dbConnect";
import OrderInterface from "../interfaces/orderInterface";
import Items from "./items";

export interface OrderInput extends Optional<OrderInterface, "id"> {}
export interface OrderOutput extends Required<OrderInterface> {}

class Orders
	extends Model<OrderInterface, OrderInput>
	implements OrderInterface
{
	public id!: number;
	public itemId!: number;
	public quantity!: number;
	public totalPrice!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Orders.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		itemId: {
			type: DataTypes.INTEGER,
			references: {
				model: Items,
				key: "id",
			},
		},
		quantity: {
			type: DataTypes.INTEGER,
		},
		totalPrice: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize: dbConnect,
		timestamps: true,
		underscored: false,
	}
);

Orders.belongsTo(Items, { foreignKey: "itemId", as: "item" });

export default Orders;
