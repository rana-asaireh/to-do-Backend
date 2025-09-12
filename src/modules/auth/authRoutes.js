import express from "express";
import * as controller from "./authController.js";
import verifyToken from "../../middlewares/authMiddleware.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { registerValidation,loginValidation} from "../../middlewares/authValidators.js";


const router = express.Router();


router.post("/register", registerValidation, validateRequest, controller.register);

router.post("/login", loginValidation, validateRequest, controller.login);

router.post("/refresh-token", controller.refreshAccessToken);

router.post("/logout", controller.logout);

router.get("/profile", verifyToken, controller.getMyProfile);


export default router;




