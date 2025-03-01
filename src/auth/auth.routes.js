import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the user"
 *               surname:
 *                 type: string
 *                 description: "Surname of the user"
 *               username:
 *                 type: string
 *                 description: "Username of the user"
 *               email:
 *                 type: string
 *                 description: "Email of the user"
 *               password:
 *                 type: string
 *                 description: "Password of the user"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: "Profile picture of the user"
 *               phone:
 *                 type: string
 *                 description: "Phone number of the user"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/login", loginValidator, login);

export default router;
