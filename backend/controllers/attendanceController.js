import asyncHandler from "express-async-handler";
import prisma from "../db.js";

// @desc  Create new attendance record
// route  POST /api/attendance
// @access Private
const createAttendance = asyncHandler(async (req, res) => {
  const { status, date } = req.body;
  const { id } = req.params;
  const newAttendance = await prisma.attendance.create({
    data: {
      userId: id,
      status,
      date,
    },
  });
  res.status(201).json({ data: "Attendance Created" });
});

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

export { createAttendance, getCurrentUserAttendance };
