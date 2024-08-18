// Bhai, yeh catchAsyncError ko import kar rahe hain jo asynchronous errors ko handle karta hai.
// Isse humko har async function me try-catch ka jhanjhat nahi rehta.
import { catchAsyncError } from "../middleware/catchAsyncError.js";

// Bhai, yeh Message model ko import kar rahe hain jo MongoDB collection ko represent karta hai.
// Iska use message data ko database me store karne ke liye hoga.
import { Message } from "../models/messageSchema.js";

// Bhai, ErrorHandlar ko import kar rahe hain jo custom error handling ke liye use hota hai.
// Isse specific error messages aur status codes ko set kiya jata hai.
import ErrorHandlar from "../middleware/errorMiddleware.js";

// Bhai, yeh sendMessage function hai jo message bhejne ka kaam karega.
// Isme catchAsyncError ka use karke async errors ko handle karenge bina try-catch ke.
export const sendMessage = catchAsyncError(async (req, res, next) => {
  // Bhai, request body se data destructure kar rahe hain: firstName, lastName, email, phone, aur message.
  const { firstName, lastName, email, phone, message } = req.body;

  // Bhai, check kar rahe hain ki sab required fields present hain ya nahi.
  // Agar koi field missing hai, to 400 status code ke sath error bhejenge.
  if (!firstName || !lastName || !email || !phone || !message) {
    // ErrorHandlar ko call karke ek custom error create kar rahe hain jo "Please Fill Full Form" message ke sath 400 status code deta hai.
    return next(new ErrorHandlar("Please Fill Full Form", 400));
  }

  // Bhai, Message model ka use karke naya message record create kar rahe hain database me.
  // Yeh create function MongoDB collection me naya document insert kar deta hai.
  await Message.create({ firstName, lastName, email, phone, message });

  // Bhai, agar sab kuch theek raha, to 200 status code ke sath success message bhej rahe hain.
  res.status(200).json({
    success: true, // Bhai, success true indicate karta hai ki operation successful tha.
    message: "Message send successfully", // User ko success message bhej rahe hain.
  });
});
