// Bhai, yeh code snippet ek user registration function ko define karta hai jo `patientRegister` naam se jana jata hai.
// Yeh function asynchronous hai aur errors ko handle karne ke liye `catchAsyncError` middleware ke through wrap kiya gaya hai.

import { catchAsyncError } from "../middleware/catchAsyncError.js"; // Bhai, `catchAsyncError` middleware ko import kar rahe hain jo asynchronous errors ko handle karta hai.
import ErrorHandlar from "../middleware/errorMiddleware.js"; // Bhai, custom error handling ke liye `ErrorHandlar` class ko import kar rahe hain.
import { User } from "../models/userSchema.js"; // Bhai, MongoDB user schema ke saath interaction ke liye `User` model ko import kar rahe hain.

// `patientRegister` function ko define kar rahe hain jo user ko register karne ke liye responsible hai.
export const patientRegister = catchAsyncError(async (req, res, next) => {
  // Bhai, request body se user ke details ko extract kar rahe hain.
  const {
    firstName, // Bhai, user ka first name.
    lastName, // Bhai, user ka last name.
    email, // Bhai, user ka email address.
    phone, // Bhai, user ka phone number.
    nic, // Bhai, user ka National Identity Card number.
    dob, // Bhai, user ki date of birth.
    gender, // Bhai, user ka gender (Male/Female).
    password, // Bhai, user ka password.
    role, // Bhai, user ka role (Admin/Patient/Doctor).
  } = req.body;

  // Bhai, yeh check karte hain ki kya sab required fields request body me hain ya nahi.
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    // Agar kisi bhi field ka value nahi hai, to `ErrorHandlar` se ek custom error generate karte hain.
    // Yeh error 400 status code ke saath "Please fill full form!" message ke sath bheja jayega.
    return next(new ErrorHandlar("Please fill full form!", 400));
  }

  // Bhai, check karte hain ki user already database me registered hai ya nahi.
  // `findOne` method use karke email ke basis pe user ko search kar rahe hain.
  let user = await User.findOne({ email });
  if (user) {
    // Agar email ke sath koi user milta hai, to iska matlab user already registered hai.
    // Toh, ek custom error generate karte hain jo 400 status code aur "User already registered" message ke saath hota hai.
    return next(new ErrorHandlar("User already registered", 400));
  }

  // Bhai, agar user already exist nahi karta, to naya user create karte hain.
  user = await User.create({
    firstName, // User ka first name.
    lastName, // User ka last name.
    email, // User ka email address.
    phone, // User ka phone number.
    nic, // User ka NIC number.
    dob, // User ki date of birth.
    gender, // User ka gender.
    password, // User ka password.
    role, // User ka role.
  });

  // Bhai, agar user successfully register ho gaya, to ek success response bhejte hain.
  res.status(200).json({
    success: true, // Response ke sath indicate kar rahe hain ki registration successful raha.
    message: "User Registered!", // Success message bhej rahe hain.
  });
});
