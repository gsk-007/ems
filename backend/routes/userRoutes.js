import express from "express";
import {
  authUser,
  getAllUsers,
  getUserProfile,
  getUserProfileById,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/:id").get(getUserProfileById);

export default router;
