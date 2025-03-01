import { Router } from "express";
import {getUsers,updatePassword,updateUser,updateProfilePicture,} from "./user.controller.js";
import {updatePasswordValidator,updateUserValidator,updateProfilePictureValidator,} from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Number of users to retrieve
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Starting index of users to retrieve
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/updatePassword/{uid}:
 *   patch:
 *     summary: Update user password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: "Current password of the user"
 *               newPassword:
 *                 type: string
 *                 description: "New password of the user"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /users/updateUser/{uid}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *               phone:
 *                 type: string
 *                 description: "Phone number of the user"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/updateUser/:uid", updateUserValidator, updateUser);

/**
 * @swagger
 * /users/updateProfilePicture/{uid}:
 *   patch:
 *     summary: Update user profile picture
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: "Profile picture of the user"
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.patch(
  "/updateProfilePicture/:uid",
  uploadProfilePicture.single("profilePicture"),
  updateProfilePictureValidator,
  updateProfilePicture
);

export default router;
