import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";
import { isAdmin, isAuthenticated, isPatient } from "../middleware/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, isPatient, postAppointment);
router.get("/getall", isAuthenticated, getAllAppointments);
router.put("/update/:id", isAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteAppointment);

export default router;
