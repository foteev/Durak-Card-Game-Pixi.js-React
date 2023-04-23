import jwt from "jsonwebtoken";
import config from "../config.js";
import formatError from "../tools/errorFormatter.js";

export default function checkAuth(request: any, response: any, next: any) {
    try {
        const token = request.headers.authorization;

        if(!request.headers.authorization) {
            return response.json({message: 'User is not authorized'});
        }

        const userData = jwt.verify(token, config.secret);
        request.user = userData;
        next();
    } catch (error) {
        console.error(error);
        response.json(formatError(error));
    }
}