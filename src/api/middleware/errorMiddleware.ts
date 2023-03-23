import { Errback, NextFunction, Request, Response } from "express";
import AppError from "../helpers/appError";

const errorMiddleware = (
	error: Errback,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(error);

	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			errorCode: error.errorCode,
			message: error.message,
		});
	}

	return res.status(500).json({
		message: "Internal Server Error",
	});
};

export default errorMiddleware;
