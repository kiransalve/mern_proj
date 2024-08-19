// Bhai, yeh Express ka scene hai, jisse routes banate aur handle karte hain.
import express from "express";
// Yeh sendMessage wala function import kar rahe hain jo message bhejne ka kaam karega.
import { sendMessage } from "../controller/messageController.js";
import { getAllMessages } from "../controller/userController.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

// Bhai, yeh naya router hai jo express.Router() se bana rahe hain.
// Iska kaam hai message related requests ko dekhna.
const router = express.Router();

// Ab yeh "/send" ka POST route set kar rahe hain.
// Jab bhi koi banda POST request bhejega is URL pe, toh sendMessage function chalega.
// sendMessage request ko handle karega aur reply dega, bas.
router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);

// Bhai, ab is router ko export kar rahe hain taaki baaki jagah pe bhi use ho sake.
export default router;
