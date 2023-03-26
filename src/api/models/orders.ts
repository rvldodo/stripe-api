import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../../config/dbConnect";
import OrderInterface from "../interfaces/orderInterface";
import Items from "./items";
import Payments from "./payment";
import Users from "./users";

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
			type: DataTypes.FLOAT(10, 2),
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: Users,
				key: "id",
			},
		},
	},
	{
		sequelize: dbConnect,
		timestamps: true,
		underscored: false,
	}
);

// associations
Orders.belongsTo(Items, { foreignKey: "itemId", as: "item" });
Orders.belongsTo(Users, { foreignKey: "userId", as: "user" });

export default Orders;
