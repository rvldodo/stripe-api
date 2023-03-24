"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Users_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Users", [
			{
				id: 1,
				firstName: "Admin",
				lastName: "Admin",
				middleName: "Admin",
				email: "admin@example.com",
				password: await bcrypt.hash("admin", 10),
				roleId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
