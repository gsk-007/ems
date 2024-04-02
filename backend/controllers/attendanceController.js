import asyncHandler from "express-async-handler";
import prisma from "../db.js";

// @desc  Create new attendance record
// route  POST /api/attendance
// @access Private
const createAttendance = asyncHandler((req, res) => {
  res.send("Create Attendance Handler");
});

// @desc  Create new attendance record
// route  get /api/attendance
// @access Private
const getCurrentUserAttendance = asyncHandler((req, res) => {
  // using request object
  res.send("Create Attendance Handler");
});

// @desc  Get Attendance of a User
// route  GET /api/attendance/:userId
// @access Private Admin
const getUserAttendanceById = asyncHandler((req, res) => {
  res.send("Get User Attendance");
});

// @desc  Update Attendance of a User
// route  PUT /api/attendance/:attendanceId
// @access Private
const updateUserAttendance = asyncHandler((req, res) => {
  res.send("Update User Attendance");
});

export {
  createAttendance,
  getUserAttendanceById,
  updateUserAttendance,
  getCurrentUserAttendance,
};
