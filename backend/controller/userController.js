// Bhai, yeh code snippet `patientRegister` aur `login` functions ko define karta hai jo user registration aur login ke liye hain.
// In functions ko asynchronous operations handle karne ke liye `catchAsyncError` middleware ke through wrap kiya gaya hai.

import { catchAsyncError } from "../middleware/catchAsyncError.js"; // Bhai, yeh middleware asynchronous errors ko handle karne ke liye import kiya gaya hai.
import ErrorHandlar from "../middleware/errorMiddleware.js"; // Bhai, yeh custom error handling ke liye import kiya gaya hai.
import { User } from "../models/userSchema.js"; // Bhai, MongoDB user schema ke saath interaction ke liye import kiya gaya hai.
import { generateToken } from "../utils/jwtToken.js";

// `patientRegister` function ko define kar rahe hain jo user registration ke liye responsible hai.
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

  generateToken(user, "User registered successfully!", 200, res);
});

// `login` function ko define kar rahe hain jo user login ke liye responsible hai.
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  // Bhai, check karte hain ki kya sab required fields request body me hain ya nahi.
  if (!email || !password || !confirmPassword || !role) {
    // Agar kisi bhi field ka value nahi hai, to `ErrorHandlar` se ek custom error generate karte hain.
    // Yeh error 400 status code ke saath "Please provide all details" message ke sath bheja jayega.
    return next(new ErrorHandlar("Please provide all details", 400));
  }

  // Bhai, check karte hain ki password aur confirm password match karte hain ya nahi.
  if (password !== confirmPassword) {
    // Agar password aur confirm password match nahi karte, to `ErrorHandlar` se ek custom error generate karte hain.
    // Yeh error 400 status code ke saath "Password and Confirm password Do not match!" message ke sath bheja jayega.
    return next(
      new ErrorHandlar("Password and Confirm password Do not match!", 400)
    );
  }

  // Bhai, email ke basis pe user ko database me search karte hain aur password ko select karte hain.
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    // Agar email ke sath koi user nahi milta, to `ErrorHandlar` se ek custom error generate karte hain.
    // Yeh error 400 status code ke saath "Invalid email or password" message ke sath bheja jayega.
    return next(new ErrorHandlar("Invalid email or password", 400));
  }

  // Bhai, check karte hain ki entered password aur stored password match karte hain ya nahi.
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    // Agar password match nahi karta, to `ErrorHandlar` se ek custom error generate karte hain.
    // Yeh error 400 status code ke saath "Invalid email or password" message ke sath bheja jayega.
    return next(new ErrorHandlar("Invalid email or password", 400));
  }

  // Bhai, check karte hain ki provided role aur stored role match karte hain ya nahi.
  if (role !== user.role) {
    // Agar role match nahi karta, to `ErrorHandlar` se ek custom error generate karte hain.
    // Yeh error 400 status code ke saath "User with this role not found" message ke sath bheja jayega.
    return next(new ErrorHandlar("User with this role not found", 400));
  }
  generateToken(user, "User logged in successfully!", 200, res);
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandlar("Please fill full form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandlar(
        `${isRegistered.role} with this email already registered!`
      )
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered!",
  });
});
