import prisma from "./db.js";
import { hashPassword } from "./utils/auth.js";
const userData = [
  {
    email: "user@test.com",
    password: await hashPassword("123456"),
    role: "USER",
  },
  {
    email: "user1@test.com",
    password: await hashPassword("123456"),
    role: "USER",
  },
  {
    email: "user2@test.com",
    password: await hashPassword("123456"),
    role: "USER",
  },
  {
    email: "user3@test.com",
    password: await hashPassword("123456"),
    role: "USER",
  },
  {
    email: "user4@test.com",
    password: await hashPassword("123456"),
    role: "USER",
  },
  {
    email: "admin@test.com",
    password: await hashPassword("123456"),
    role: "ADMIN",
  },
];

await Promise.all(
  userData.map((user) => {
    return prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  })
);

const departments = [
  {
    name: "Computer Science Engineering",
    type: "TEACHING",
  },
  {
    name: "Electronics and Telecommunications Engineering",
    type: "TEACHING",
  },
  {
    name: "Electrical and Electronic Engineering",
    type: "TEACHING",
  },
  {
    name: "Mechanical Engineering",
    type: "TEACHING",
  },
  {
    name: "Humanities",
    type: "TEACHING",
  },
  {
    name: "Director Office",
    type: "NONTEACHING",
  },
  {
    name: "Dean Office",
    type: "NONTEACHING",
  },
  {
    name: "Registrar Office",
    type: "NONTEACHING",
  },
  {
    name: "Accounts Office",
    type: "NONTEACHING",
  },
];

await prisma.department.createMany({
  data: departments,
});
