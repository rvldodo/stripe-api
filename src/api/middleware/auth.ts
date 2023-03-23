import { NextFunction, Request, Response } from "express";
import AppError from "../helpers/appError";
import ExtractToken from "../helpers/helper";

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

const adminRole = (req: Request, res: Response, next: NextFunction) => {
	const { roleId } = res.locals;

	if (roleId !== 1) {
		throw new AppError(403, "Unauthorized access", 400);
	}

	next();
};

export { adminRole, authorization };
