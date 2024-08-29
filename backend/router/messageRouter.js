import express from "express";

import { sendMessage } from "../controller/messageController.js";
import { getAllMessages } from "../controller/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAuthenticated, isAdmin, getAllMessages);

export default router;
