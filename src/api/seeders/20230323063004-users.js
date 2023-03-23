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
				firstName: "Rivaldo",
				lastName: "Lawalata",
				middleName: "Ardika",
				email: "ritza.kerz18@gmail.com",
				password: await bcrypt.hash("ritzakerz1818", 10),
				roleId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				firstName: "John",
				lastName: "Doe",
				middleName: "Marshal",
				email: "johndoe@gmail.com",
				password: await bcrypt.hash("johndoe", 10),
				roleId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				firstName: "Pete",
				lastName: "Henderson",
				middleName: "Steve",
				email: "stevepete@gmail.com",
				password: await bcrypt.hash("petehenderson", 10),
				roleId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
