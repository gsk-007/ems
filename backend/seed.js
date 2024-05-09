import prisma from "./db.js";

// const leaveData = [
//   { type: "Casual Leave", count: 10 },
//   { type: "Medical Leave", count: 10 },
//   { type: "Earned Leave", count: 13 },
//   { type: "Duty Leave", count: 20 },
//   { type: "On Duty", count: 0 },
//   { type: "Optional Leave", count: 1 },
// ];

// await prisma.leaveType.createMany({ data: leaveData });

// import { hashPassword } from "./utils/auth.js";
// const userData = [
//   {
//     name: "user",
//     email: "user@test.com",
//     password: await hashPassword("123456"),
//     role: "USER",
//   },
//   {
//     name: "user1",
//     email: "user1@test.com",
//     password: await hashPassword("123456"),
//     role: "USER",
//   },
//   {
//     name: "user2",
//     email: "user2@test.com",
//     password: await hashPassword("123456"),
//     role: "USER",
//   },
//   {
//     name: "user3",
//     email: "user3@test.com",
//     password: await hashPassword("123456"),
//     role: "USER",
//   },
//   {
//     name: "user4",
//     email: "user4@test.com",
//     password: await hashPassword("123456"),
//     role: "USER",
//   },
//   {
//     name: "admin",
//     email: "admin@test.com",
//     password: await hashPassword("123456"),
//     role: "ADMIN",
//   },
// ];

// await Promise.all(
//   userData.map((user) => {
//     return prisma.user.create({
//       data: {
//         email: user.email,
//         password: user.password,
//         role: user.role,
//       },
//     });
//   })
// );

// const departments = [
//   {
//     name: "Computer Science Engineering",
//     type: "TEACHING",
//   },
//   {
//     name: "Electronics and Telecommunications Engineering",
//     type: "TEACHING",
//   },
//   {
//     name: "Electrical and Electronic Engineering",
//     type: "TEACHING",
//   },
//   {
//     name: "Mechanical Engineering",
//     type: "TEACHING",
//   },
//   {
//     name: "Humanities",
//     type: "TEACHING",
//   },
//   {
//     name: "Director Office",
//     type: "NONTEACHING",
//   },
//   {
//     name: "Dean Office",
//     type: "NONTEACHING",
//   },
//   {
//     name: "Registrar Office",
//     type: "NONTEACHING",
//   },
//   {
//     name: "Accounts Office",
//     type: "NONTEACHING",
//   },
// ];

// await prisma.department.createMany({
//   data: departments,
// });
