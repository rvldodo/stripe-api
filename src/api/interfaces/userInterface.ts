export default interface UserInterface {
	id?: number;
	firstName?: string | null;
	middleName?: string | null;
	lastName?: string | null;
	email?: string | null;
	password?: string | null;
	roleId?: number | null;
	orderId?: number | null;
	balanceId?: number | null;

	createdAt?: Date;
	updatedAt?: Date;
}
