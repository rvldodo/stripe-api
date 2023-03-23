import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../../config/dbConnect";
import RoleInterface from "../interfaces/roleInterface";
import Users from "./users";

export interface RoleInput extends Optional<RoleInterface, "id"> {}
export interface RoleOutput extends Required<RoleInterface> {}

class Roles extends Model<RoleInterface, RoleInput> implements RoleInterface {
	public id!: number;
	public role!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Roles.init(
	{
		id: {
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
			type: DataTypes.NUMBER,
		},
		role: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize: dbConnect,
		timestamps: true,
		underscored: false,
	}
);

export default Roles;
