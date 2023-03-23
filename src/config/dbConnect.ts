import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const dbName = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbDatabase = process.env.DB_DATABASE as string;
const dbHost = process.env.DB_HOST;
const dbDialect = "postgres";
const dbPort = 5433;

const sequelizeConnection = new Sequelize(dbDatabase, dbName, dbPassword, {
	host: dbHost,
	dialect: dbDialect,
	port: dbPort,
});

export default sequelizeConnection;
