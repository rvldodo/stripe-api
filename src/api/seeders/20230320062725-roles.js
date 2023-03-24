"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Users_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Roles", [
			{
				id: 1,
				role: "admin",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				role: "user",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Roles", null, {});
	},
};
