import asyncHandler from "express-async-handler";
import prisma from "../db.js";

// @desc  Create new attendance record
// route  get /api/attendance
// @access Private
const getCurrentUserAttendance = asyncHandler(async (req, res) => {
  const { month, year } = req.query;
  if (!month || !year) {
    return res.status(400).send("Invalid Route");
  }

  const startDate = new Date(year, month - 1, 1);
  // Get the last day of the month
  const endDate = new Date(year, month, 0);

  const attendance = await prisma.attendance.findMany({
    where: {
      userId: req.user.id,
      // Filter by date within the current month
      AND: [
        {
          date: {
            gte: startDate,
            lt: endDate, // Start of the next month
          },
        },
      ],
    },
    orderBy: {
      date: "asc",
    },
    select: {
      date: true,
      status: true,
    },
  });

  res.status(200).json(attendance);
});

// @desc  Get Today's Attendance
// route  GET /api/attendance/:id
// @access Private
const getTodayAttendance = asyncHandler(async (req, res) => {
  const attendance = await prisma.attendance.findUnique({
    data: {
      userId: req.user.id,
      date: new Date(),
    },
  });
  res.status(201).json(attendance);
});
// @desc  Create new attendance record
// route  POST /api/attendance/:id
// @access Private
const createAttendance = asyncHandler(async (req, res) => {
  const { status, date, time_in } = req.body;
  const { id } = req.params;
  const newAttendance = await prisma.attendance.create({
    data: {
      userId: id,
      status,
      date,
      time_in,
    },
  });
  res.status(201).json({ data: "Attendance Created" });
});

// @desc  Update  attendance record
// route  PUT /api/attendance/:id
// @access Private
const updateUserCurrentAttendance = asyncHandler(async (req, res) => {
  const { date, time_out } = req.body;
  const { id } = req.params;
  const updated = await prisma.attendance.update({
    where: {
      date,
      userId: id,
    },
    data: {
      time_out,
    },
  });
  res.status(201).json({ data: "Attendance Updated" });
});

export {
  createAttendance,
  getCurrentUserAttendance,
  getTodayAttendance,
  updateUserCurrentAttendance,
};
