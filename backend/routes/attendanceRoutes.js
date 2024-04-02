import express from "express";
import {
  createAttendance,
  getCurrentUserAttendance,
  getUserAttendanceById,
  updateUserAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/", createAttendance);
router.put("/", updateUserAttendance);
router.get("/", getCurrentUserAttendance);
router.get("/:id", getUserAttendanceById);

export default router;
