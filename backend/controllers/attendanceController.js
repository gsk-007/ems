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
  const { month, year } = req.query
  if (!month || !year) {
    return res.status(400).send("Invalid Route")
  }

  const startDate = `${year}-${month}-01`
  const endDate = `${year}-${month < 12 ? month + 1 : 1}-01`

  const attendance = await prisma.attendance.findMany({
    where: {
      AND: [
        { userId: req.user.id },
        { date: { gte: startDate } },
        { date: { lt: endDate } }
      ]
    },
  });

  res.status(200).json(attendance);
});

export { createAttendance, getCurrentUserAttendance };
