import express from "express";
import {
  createLeaveRequest,
  deleteLeaveRequest,
  getLeaveTypes,
  getUserLeaves,
  updateLeaveRequestStatus,
} from "../controllers/leaveController.js";

const router = express.Router();

router.get("/blah", getLeaveTypes);
router.route("/").get(getUserLeaves).post(createLeaveRequest);
router.route("/:id").put(updateLeaveRequestStatus).delete(deleteLeaveRequest);

export default router;
