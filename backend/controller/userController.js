import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandlar from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

// Bhai, yeh patient ko register karne ka function hai jo token bhi generate karta hai.
export const patientRegister = catchAsyncError(async (req, res, next) => {
  // Bhai, request body se user ke details nikaal rahe hain.
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  } = req.body;

  // Bhai, check karte hain ki sabhi fields bharay gaye hain ya nahi.
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
    return next(new ErrorHandlar("Please fill full form!", 400)); // Agar koi field missing hai to error throw karte hain.
  }

  // Bhai, check kar rahe hain ki user already registered hai ya nahi.
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandlar("User already registered", 400)); // Agar user already exist karta hai to error.
  }

  // Bhai, agar user exist nahi karta to naya user create kar rahe hain.
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  });

  // Bhai, user ko successfully register karne ke baad token generate kar rahe hain.
  generateToken(user, "User registered successfully!", 200, res);
});

// Bhai, yeh login function hai jo user ko login karta hai.
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  // Bhai, yeh check karte hain ki sabhi fields bharay gaye hain ya nahi.
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandlar("Please provide all details", 400)); // Agar fields missing hain to error.
  }

  // Bhai, check kar rahe hain ki password aur confirm password match karte hain ya nahi.
  if (password !== confirmPassword) {
    return next(
      new ErrorHandlar("Password and Confirm password Do not match!", 400)
    ); // Agar password match nahi karta to error.
  }

  // Bhai, email ke basis pe user ko database se dhundh rahe hain.
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandlar("Invalid email or password", 400)); // Agar user nahi milta to error.
  }

  // Bhai, entered password ko database wale password se compare kar rahe hain.
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandlar("Invalid email or password", 400)); // Agar password galat hai to error.
  }

  // Bhai, check karte hain ki user ka role sahi hai ya nahi.
  if (role !== user.role) {
    return next(new ErrorHandlar("User with this role not found", 400)); // Agar role galat hai to error.
  }

  // Bhai, agar sab kuch sahi hai to token generate kar rahe hain.
  generateToken(user, "User logged in successfully!", 200, res);
});

// Bhai, yeh function naya admin register karne ke liye hai.
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

  // Bhai, check kar rahe hain ki sabhi fields filled hain ya nahi.
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
    return next(new ErrorHandlar("Please fill full form!", 400)); // Agar koi field missing hai to error.
  }

  // Bhai, check kar rahe hain ki email already registered hai ya nahi.
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandlar(
        `${isRegistered.role} with this email already registered!`
      )
    ); // Agar registered hai to error.
  }

  // Bhai, agar registered nahi hai to naya admin create kar rahe hain.
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

  // Bhai, response bhej rahe hain ki naya admin successfully register ho gaya hai.
  res.status(200).json({
    success: true,
    message: "New Admin Registered!",
  });
});

// Bhai, yeh function sabhi doctors ki list nikaalne ke liye hai.
export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  // Bhai, database me sab doctors ko dhundh rahe hain jinka role "Doctor" hai.
  const doctors = await User.find({ role: "Doctor" });

  // Bhai, doctors ki list return kar rahe hain.
  res.status(200).json({
    success: true,
    doctors,
  });
});

// Bhai, yeh function current logged-in user ke details bhejne ke liye hai.
export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  // Bhai, user details ka response bhej rahe hain.
  res.status(200).json({
    success: true,
    user,
  });
});

// Bhai, yeh function admin ko logout karne ke liye hai.
export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  // Bhai, admin ka token ko clear kar rahe hain aur expiration time set kar rahe hain.
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin is logged out!", // Bhai, logout hone ka message bhej rahe hain.
    });
});

// Bhai, yeh function patient ko logout karne ke liye hai.
export const logoutPatient = catchAsyncError(async (req, res, next) => {
  // Bhai, patient ka token ko clear kar rahe hain aur expiration time set kar rahe hain.
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient is logged out!", // Bhai, logout hone ka message bhej rahe hain.
    });
});

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});
