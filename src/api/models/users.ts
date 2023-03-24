import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../../config/dbConnect";
import UserInterface from "../interfaces/userInterface";
import Balance from "./balance";
import Orders from "./orders";
import Roles from "./roles";

export interface UserInput extends Optional<UserInterface, "id"> {}
export interface UserOutput extends Required<UserInterface> {}

class Users extends Model<UserInterface, UserInput> implements UserInterface {
	public id!: number;
	public firstName!: string;
	public middleName!: string;
	public lastName!: string;
	public email!: string;
	public password!: string;
	public roleId!: number;
	public balanceId!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Users.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		middleName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Roles,
				key: "id",
			},
		},
		balanceId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: Balance,
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
Users.belongsTo(Orders, { foreignKey: "orderId", as: "order" });
Users.belongsTo(Balance, { foreignKey: "balanceId", as: "balance" });

export default Users;
