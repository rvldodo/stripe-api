export default interface OrderInterface {
	id?: number;
	itemId?: number;
	quantity?: number;
	totalPrice?: number;

	createdAt?: Date;
	updatedAt?: Date;
}
