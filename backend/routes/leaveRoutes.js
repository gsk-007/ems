import express from "express";
import {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveTypes,
  getUserLeaves,
  updateLeaveRequestStatus,
} from "../controllers/leaveController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUserLeaves).post(protect, createLeaveRequest);
router.route("/:id").put(updateLeaveRequestStatus).delete(deleteLeaveRequest);

export default router;
