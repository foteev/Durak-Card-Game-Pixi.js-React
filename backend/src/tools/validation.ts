import { check } from "express-validator";

export default [
    check('email', 'Email wish not be empty').notEmpty(),
    check('email', 'Email have to be in correct format').isEmail(),
    check('password', 'Password have to be more than 6 symbols').isLength({min: 6})
];