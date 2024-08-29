import express from "express";
import {
  addNewAdmin,
  patientRegister,
  login,
  getAllDoctors,
  getUserDetails,
  logoutUser,
  addNewDoctor,
} from "../controller/userController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Common routes for both admin and patient
router.post("/register", patientRegister);
router.post("/login", login);
router.get("/me", isAuthenticated, getUserDetails);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/doctors", isAuthenticated, getAllDoctors);

// Admin-specific routes
router.post("/admin/addnew", isAuthenticated, isAdmin, addNewAdmin);
router.post("/doctor/addnew", isAuthenticated, isAdmin, addNewDoctor);

export default router;
