import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandlar from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

// Common middleware to authenticate users
export const isAuthenticated = catchAsyncError(async function (req, res, next) {
  const token =
    req.cookies.adminToken ||
    req.cookies.patientToken ||
    req.cookies.doctorToken;

  if (!token) {
    return next(new ErrorHandlar("Not authenticated!", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    console.log(req.user);
    if (!req.user) {
      return next(new ErrorHandlar("User not found!", 404));
    }
  } catch (error) {
    return next(new ErrorHandlar("Invalid token!", 401));
  }

  next();
});

// Middleware to authorize only admins
export const isAdmin = catchAsyncError(async function (req, res, next) {
  console.log(req);
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandlar(
        `${req.user.role} not authorized for this resource!`,
        403
      )
    );
  }
  next();
});

// Middleware to authorize only patients
export const isPatient = catchAsyncError(async function (req, res, next) {
  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandlar(
        `${req.user.role} not authorized for this resource!`,
        403
      )
    );
  }
  next();
});
