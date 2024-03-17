import asyncHandler from "express-async-handler"
import prisma from "../db.js"
import { hashPassword } from "../utils/auth.js"

// @desc  Auth user/set token
// route  POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).send("AUTH USER")
})

// @desc Register a new user
// route  POST /api/users
// @access Private/Admin
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (userExists) {
    res.status(400)
    throw new Error("User Already exists")
  }
  const hashedPassword = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || "USER",
    },
  })
  if (user) {
    res.status(201).json({
      id: user.id,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc  Logout suer
// route  POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.send("LOGOUT USER")
})

// @desc  Get user profile
// route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("USER PROFILE")
})

// @desc  Update user profile
// route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("UPDATE USER PROFILE")
})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }
