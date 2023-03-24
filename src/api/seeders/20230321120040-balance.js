"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Balances", [
			{
				id: 1,
				balance: 9000.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				balance: 8000.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				balance: 7000.0,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
