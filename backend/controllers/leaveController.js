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
// route  GET /api/leave/types
// @access Private User
const getUserLeaves = asyncHandler(async (req, res) => {
  const userLeaves = await prisma.userLeaveType.findMany({
    where: { userId: req.user.id },
    select: {
      id: true,
      leaveCount: true,
      leaveType: {
        select: {
          type: true,
          id: true,
        },
      },
    },
    orderBy: {
      leaveCount: "desc",
    },
  });
  res.status(200).json(userLeaves);
});

// @desc  Create a Leave Request
// route  POST /api/leave/request
// @access Private User
const createLeaveRequest = asyncHandler(async (req, res) => {
  const { leaveTypeId, StartDate, EndDate, reason, supervisorId } = req.body;
  const newLeave = await prisma.leaveRequest.create({
    data: {
      StartDate,
      EndDate,
      reason,
      leaveTypeId,
      userId: req.user.id,
      approval: {
        create: {
          supervisorId,
        },
      },
    },
  });
  res.status(200).json("Create Leave Request");
});
// @desc  Get Leave Request
// route  GET /api/leave/request
// @access Private User
const getUserLeaveRequests = asyncHandler(async (req, res) => {
  const leaveRequests = await prisma.leaveRequest.findMany({
    where: {
      userId: req.user.id,
    },
    select: {
      id: true,
      StartDate: true,
      EndDate: true,
      reason: true,
      status: true,
      documents: true,
    },
  });
  res.status(200).json(leaveRequests);
});

// @desc  Update  Leave Request Status
// route  GET /api/leave/
// @access Private User
const getUserApprovalRequests = asyncHandler(async (req, res) => {
  const leaveApprovals = await prisma.leaveApproval.findMany({
    where: {
      supervisorId: req.user.id,
    },
    include: {
      leaveRequest: {
        select: {
          StartDate: true,
          EndDate: true,
          reason: true,
          status: true,
          documents: true,
          leaveType: {
            include: {
              leaveType: {
                select: {
                  type: true,
                },
              },
            },
          },
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json(leaveApprovals);
});
// @desc  Update  Leave Request Status
// route  PUT /api/leave/:id
// @access Private User
const updateLeaveRequestStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, newLeaveCount } = req.body;
  const updated = await prisma.leaveRequest.update({
    where: { id: Number(id) },
    data: { status },
  });
  await prisma.userLeaveType.update({
    where: {
      id: updated.leaveTypeId,
    },
    data: { leaveCount: Number(newLeaveCount) },
  });

  res.status(200).json("Update Leave Request");
});

// @desc  Update  Leave Request Status
// route  DELETE /api/leave/:id
// @access Private User
const deleteLeaveRequest = asyncHandler(async (req, res) => {
  res.status(200).json("Update Leave Request");
});

export {
  getUserLeaves,
  getUserLeaveRequests,
  getUserApprovalRequests,
  createLeaveRequest,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
};
