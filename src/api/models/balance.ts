import { DataTypes, Model, Optional } from "sequelize";
import dbConnect from "../../config/dbConnect";
import BalanceInterface from "../interfaces/balanceInterface";

export interface BalanceInput extends Optional<BalanceInterface, "id"> {}
export interface BalanceOutput extends Required<BalanceInterface> {}

class Balances
	extends Model<BalanceInterface, BalanceInput>
	implements BalanceInterface
{
	public id!: number;
	public balance!: number;

	public readonly createAt!: Date;
	public readonly updatedAt!: Date;
}

Balances.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		balance: {
			type: DataTypes.INTEGER,
		},
	},
	{ sequelize: dbConnect, timestamps: true, underscored: false }
);

export default Balances;
