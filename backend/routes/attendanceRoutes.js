import express from "express";
import {
  createAttendance,
  getCurrentUserAttendance,
  updateUserCurrentAttendance,
} from "../controllers/attendanceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCurrentUserAttendance);
router.route("/:id").post(createAttendance).put(updateUserCurrentAttendance);

export default router;
