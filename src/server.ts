import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import apiDocs from "./config/apiDocs.json";
import sequelizeConnection from "./config/dbConnect";
dotenv.config();

// routes import
import itemRoutes from "./api/routes/itemRoutes";
import loginRoutes from "./api/routes/loginRoutes";
import orderRoutes from "./api/routes/orderRoutes";
import registerRoutes from "./api/routes/registerRoutes";
import userRoutes from "./api/routes/userRoutes";

const app = express();

const PORT = process.env.PORT || 3000;

// swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, async () => {
	console.log(`Server running on ${process.env.NODE_ENV} mode in port ${PORT}`);
	await sequelizeConnection.authenticate();
	console.log(`DB connected to server`);
});
