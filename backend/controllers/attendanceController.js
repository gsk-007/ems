import asyncHandler from "express-async-handler";
import prisma from "../db.js";

// @desc  Create new attendance record
// route  POST /api/attendance
// @access Private
const createAttendance = asyncHandler(async (req, res) => {
  const { status, date } = req.body;
  const { id } = req.params
  const newAttendance = await prisma.attendance.create({
    data: {
      userId: id,
      status,
      date
    },
  });
  res.status(201).json({ data: "Attendance Created" });
});

// @desc  Create new attendance record
// route  get /api/attendance
// @access Private
const getCurrentUserAttendance = asyncHandler(async (req, res) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.status(200).json(attendance);
});

export { createAttendance, getCurrentUserAttendance };
