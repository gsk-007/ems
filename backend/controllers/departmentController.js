import asyncHandler from "express-async-handler";
import prisma from "../db.js";

// @desc  Get Departments
// route  GET /api/department
// @access Public
const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await prisma.department.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  res.status(200).json(departments);
});

// @desc  Create Department
// route  POST /api/department
// @access Private Admin
const createDepartment = asyncHandler(async (req, res) => {
  const { name, type, superviserId } = req.body;
  const newDepartment = await prisma.department.create({
    data: {
      name,
      type,
      superviserId,
    },
  });
  res.status(201).json("New Department Created");
});

// @desc  Update Department
// route  PUT /api/department/:id
// @access Private admin
const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updateDepartment = await prisma.department.update({
    where: { id },
    data: data,
  });
  res.status(201).send(updateDepartment);
});

// @desc  Delete Department
// route  DELETE /api/department/:id
// @access Private admin
const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.department.delete({
    where: { id: Number(id) },
  });
  res.status(200).json("Department Deleted");
});

export {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
