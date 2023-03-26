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
				price: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				item: "Jeans",
				price: 5000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				item: "Sneakers",
				price: 12000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				item: "Sunglasses",
				price: 1000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				item: "Backpack",
				price: 4000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Items", null, {});
	},
};
