import express from "express";
import {
  createAttendance,
  getCurrentUserAttendance,
  getTodayAttendance,
  updateUserCurrentAttendance,
} from "../controllers/attendanceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCurrentUserAttendance);
router.get("/today", protect, getTodayAttendance);
router.route("/:id").post(createAttendance).put(updateUserCurrentAttendance);

export default router;
