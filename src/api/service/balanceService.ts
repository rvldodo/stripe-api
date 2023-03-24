import Balances from "../models/balance";

class BalanceService {
	static async createBalance(deposit: number) {
		return await Balances.create({ balance: deposit });
	}
}

export default BalanceService;
