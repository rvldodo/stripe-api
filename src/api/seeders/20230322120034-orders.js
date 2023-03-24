"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Orders_id_seq" RESTART WITH 101'
		);
		await queryInterface.bulkInsert("Orders", [
			{
				id: 1,
				itemId: 1,
				quantity: 2,
				totalPrice: 39.98,
			},
			{
				id: 2,
				itemId: 2,
				quantity: 1,
				totalPrice: 49.99,
			},
			{
				id: 3,
				itemId: 5,
				quantity: 3,
				totalPrice: 179.98,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Orders", null, {});
	},
};
