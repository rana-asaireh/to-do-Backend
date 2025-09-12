import { body} from "express-validator";

export const registerValidation = [
body("fullName").notEmpty().withMessage("Full name is required"),
body("userPassword").notEmpty().withMessage("Password is required"),
body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Valid email is required")
];


export const loginValidation = [
body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Valid email is required"),
  body("userPassword").notEmpty().withMessage("Password is required"),
];



