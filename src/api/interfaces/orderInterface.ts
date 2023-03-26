export default interface OrderInterface {
	id?: number;
	itemId?: number;
	quantity?: number;
	totalPrice?: number;
	userId?: number;

	createdAt?: Date;
	updatedAt?: Date;
}
