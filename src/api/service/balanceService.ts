import Balances from "../models/balance";

class BalanceService {
	static async createBalance(deposit: number) {
		return await Balances.create({ balance: deposit });
	}

	static async findAllBalances() {
		return await Balances.findAll();
	}

	static async findBalanceById(id: any) {
		return await Balances.findOne({
			where: { id },
		});
	}

	static async deleteBalanceById(id: any) {
		return await Balances.destroy({
			where: { id },
		});
	}
}

export default BalanceService;
