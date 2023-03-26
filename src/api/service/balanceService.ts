import Balances from "../models/balance";

class BalanceService {
	static async createBalance(deposit: number) {
		return await Balances.create({
			balance: deposit,
		});
	}

	static async findAllBalances() {
		return await Balances.findAll({
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
	}

	static async findBalanceById(id: any) {
		return await Balances.findOne({
			where: { id },
			attributes: {
				exclude: ["updatedAt", "createdAt"],
			},
		});
	}

	static async deleteBalanceById(id: any) {
		return await Balances.destroy({
			where: { id },
		});
	}
}

export default BalanceService;
