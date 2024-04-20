import express from "express";
import {
  createAttendance,
  getCurrentUserAttendance,
} from "../controllers/attendanceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCurrentUserAttendance);
router.post("/", protect, createAttendance);

export default router;
