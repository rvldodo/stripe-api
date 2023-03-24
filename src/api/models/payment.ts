import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../../config/dbConnect";
import PaymentInterface from "../interfaces/paymentInterface";
import Orders from "./orders";
import Users from "./users";

export interface PaymentInput extends Optional<PaymentInterface, "id"> {}
export interface PaymentOutput extends Required<PaymentInterface> {}

class Payments
	extends Model<PaymentInterface, PaymentInput>
	implements PaymentInterface
{
	public id!: number;
	public userId!: number;
	public orderId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Payments.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: Users,
				key: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			primaryKey: true,
		},
		orderId: {
			type: DataTypes.INTEGER,
			references: {
				model: Orders,
				key: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			primaryKey: true,
		},
	},
	{ sequelize: dbConnect, timestamps: true, underscored: false }
);

// associations
Orders.belongsToMany(Users, { through: Payments, as: "user" });
Users.belongsToMany(Orders, { through: Payments, as: "user" });

export default Payments;
