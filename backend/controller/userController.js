import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandlar from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";
import { Message } from "../models/messageSchema.js";

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "nic",
  "dob",
  "gender",
  "password",
];

const findMissingFields = (fields, data) => {
  return fields.filter((field) => !data[field]);
};
export const patientRegister = catchAsyncError(async (req, res, next) => {
  const requestData = req.body;
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role = "Patient", //
  } = requestData;
  const missingFields = findMissingFields(requiredFields, requestData);

  if (missingFields.length > 0) {
    return next(
      new ErrorHandlar(`Missing fields: ${missingFields.join(", ")}`, 400)
    );
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandlar("User already registered", 400));
  }

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

  generateToken(user, "User registered successfully!", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandlar("Please provide all details", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandlar("Password and Confirm password Do not match!", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandlar("Invalid email or password", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandlar("Invalid email or password", 400));
  }

  if (role !== user.role) {
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

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });

  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin is logged out!",
    });
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient is logged out!",
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

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const message = await Message.find();
  res.status(200).json({
    success: true,
    message,
  });
});
