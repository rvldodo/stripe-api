import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../helpers/appError";
import ExtractToken from "../helpers/helper";
dotenv.config();

const authorization = (req: Request, res: Response, next: NextFunction) => {
	const bearer = req.headers["authorization"];
	const token = bearer?.split(" ")[1];
	if (!token) {
		throw new AppError(403, "Unauthorized access", 400);
	}

	const user = ExtractToken(token);

	if (!user) {
		throw new AppError(404, "User not found", 400);
	}

	res.locals.roleId = user?.roleId;
	res.locals.email = user?.email;

	next();
};

export default authorization;
