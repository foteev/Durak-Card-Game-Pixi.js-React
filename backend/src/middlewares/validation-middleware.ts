import { validationResult } from 'express-validator';
import formatError from '../tools/errorFormatter.js';

export default function checkValidation(request: any, response: any, next: any){
    try {
        const validationErrors = validationResult(request);
        if (!validationErrors.isEmpty()) {
            return response.json(validationErrors);
        }

        next();
    } catch (error) {
        console.error(error);
        response.json(formatError(error));
    }
}