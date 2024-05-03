import asyncHandler from "express-async-handler";
import prisma from "../db.js";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth.js";

// @desc  Auth user/set token
// route  POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && (await comparePasswords(password, user.password))) {
    createJWT(user.id, res);
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    res.status(201).json(user);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userExists) {
    res.status(400);
    throw new Error("User Already exists");
  }
  if (role === "ADMIN") {
    const adminCount = await prisma.user.count({
      where: {
        role: "ADMIN",
      },
    });
    if (adminCount === 2) {
      res.status(400);
      throw new Error("Admin Registration Closed");
    }
  }
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || "USER",
      isApproved: role == "ADMIN",
    },
  });
  if (user) {
    createJWT(user.id, res);
    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Logout user
// route  POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ data: "User logged out" });
});

// @desc  Get all users
// route  GET /api/users/
// @access Private admin
const getAllUsers = asyncHandler(async (req, res) => {
  console.log(req.query);
  const { approved } = req.query;
  if (approved && req.user.role !== "ADMIN") {
    throw new Error("Access Denied");
  }
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
      isApproved: Boolean(approved) && true,
    },
    select: {
      id: true,
      name: true,
    },
  });
  res.status(200).json(users);
});

// @desc  Get user profile
// route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc  Update user profile
// route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: userData,
  });
  delete updatedUser.password;
  res.json(updatedUser);
});

// @desc  Get user profile by id
// route  GET /api/users/:id
// @access Private
const getUserProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new Error("User Doesn't Exist");
  }
  delete user.password;
  res.status(200).json(user);
});

// @desc  Update user profile by id
// route  GET /api/users/:id
// @access Private Admin
const updateUserProfileById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User Doesn't Exist");
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: req.body,
  });

  res.status(200).json(updatedUser);
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserProfileById,
  updateUserProfileById,
};
