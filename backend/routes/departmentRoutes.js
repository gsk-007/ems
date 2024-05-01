import express from "express";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  updateDepartment,
} from "../controllers/departmentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllDepartments);
router.post("/", protect, admin, createDepartment);
router.route("/:id").put(updateDepartment).delete(deleteDepartment);

export default router;
