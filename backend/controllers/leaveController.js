import prisma from "../db.js";
import asyncHandler from "express-async-handler";

// @desc  Get Leave Types
// route  GET /api/leave/leavetypes
// @access Private Admin
const getLeaveTypes = asyncHandler(async (req, res) => {
  const leavetypes = await prisma.leaveType.findMany();
  res.status(200).json(leavetypes);
});

// @desc  Get User Leave Types
// route  GET /api/leave/userleave
// @access Private User
const getUserLeaves = asyncHandler(async (req, res) => {
  const userLeaves = await prisma.userLeaveType.findMany({
    where: { userId: req.user.id },
  });
  res.status(200).json(userLeaves);
});

// @desc  Create a Leave Request
// route  Post /api/leave/
// @access Private User
const createLeaveRequest = asyncHandler(async (req, res) => {
  const { leaveType, start, end, reason } = req.body;
  const newLeave = await prisma.leaveRequest.create({
    data: {
      StartDate: start,
      EndDate: end,
      reason: reason,
      leaveTypeId: leaveType,
      userId: req.user.id,
    },
  });
  // const leaveApproval
  res.status(200).json("Create Leave Request");
});

// @desc  Update  Leave Request Status
// route  PUT /api/leave/:id
// @access Private User
const updateLeaveRequestStatus = asyncHandler(async (req, res) => {
  res.status(200).json("Update Leave Request");
});

// @desc  Update  Leave Request Status
// route  DELETE /api/leave/:id
// @access Private User
const deleteLeaveRequest = asyncHandler(async (req, res) => {
  res.status(200).json("Update Leave Request");
});

export {
  getLeaveTypes,
  getUserLeaves,
  createLeaveRequest,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
};
