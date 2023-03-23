import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Payload from "../interfaces/payload";
dotenv.config();

const ExtractToken = (token: string): Payload | null => {
	const secreteKey: string = process.env.ACCESS_TOKEN_SECRET as string;

	let resData: any;
	const res = jwt.verify(token, secreteKey, (err, decode) => {
		if (err) {
			resData = null;
		} else {
			resData = decode;
		}
	});

	if (resData) {
		const result: Payload = <Payload>resData;
		return result;
	}
	return null;
};

export default ExtractToken;
