import express from "express";
import {
  createLeaveRequest,
  deleteLeaveRequest,
  getUserLeaveRequests,
  getUserLeaves,
  updateLeaveRequestStatus,
} from "../controllers/leaveController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(protect, getUserLeaves);
router
  .route("/request")
  .get(protect, getUserLeaveRequests)
  .post(protect, createLeaveRequest);
router
  .route("/request/:id")
  .put(updateLeaveRequestStatus)
  .delete(deleteLeaveRequest);

export default router;
