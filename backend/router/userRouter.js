import express from "express";
import {
  addNewAdmin,
  patientRegister,
  login,
  getAllDoctors,
} from "../controller/userController.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);

export default router;
