"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Items_id_seq" RESTART WITH 101'
		);
		await queryInterface.bulkInsert("Items", [
			{
				id: 1,
				item: "T-shirt",
				price: 19.99,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				item: "Jeans",
				price: 49.99,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				item: "Sneakers",
				price: 89.99,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				item: "Sunglasses",
				price: 29.99,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				item: "Backpack",
				price: 59.99,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Items", null, {});
	},
};
