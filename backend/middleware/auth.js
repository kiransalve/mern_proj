import { User } from "../models/userSchema.js"; // Bhai, `User` model ko import kar rahe hain jo database se user data handle karega.
import { catchAsyncError } from "./catchAsyncError.js"; // Bhai, `catchAsyncError` middleware ko import kar rahe hain jo async errors ko handle karega.
import ErrorHandlar from "./errorMiddleware.js"; // Bhai, custom error handling ke liye `ErrorHandlar` class ko import kar rahe hain.
import jwt from "jsonwebtoken"; // Bhai, JSON Web Token ko verify karne ke liye `jsonwebtoken` library ko import kar rahe hain.

// `isAdminAuthenticated` ek middleware function hai jo check karta hai ki request karne wala user admin hai ya nahi.
export const isAdminAuthenticated = catchAsyncError(async function (
  req,
  res,
  next
) {
  // Bhai, admin ke token ko cookies se extract kar rahe hain.
  const token = req.cookies.adminToken;

  // Agar token nahi milta, to ek error create karte hain jo 400 status code aur "Admin not authenticated!" message ke saath hota hai.
  if (!token) {
    return next(new ErrorHandlar("Admin not authenticated!", 400));
  }

  // Bhai, token ko verify karte hain aur decoded data ko extract karte hain.
  // `JWT_SECRET_KEY` se token verify karte hain jo environment variable se milta hai.
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Bhai, decoded data se user ko database se find karte hain aur `req.user` me set karte hain.
  req.user = await User.findById(decoded.id);

  // Agar user ka role "Admin" nahi hai, to ek error generate karte hain jo 403 status code aur user role ke sath "not authorized" message ke saath hota hai.
  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandlar(
        `${req.user.role} not authorized for this resources!`,
        403
      )
    );
  }
  // Agar sab kuch theek hai, to `next` function ko call karte hain jo next middleware ko execute karega.
  next();
});

export const isPatientAuthenticated = catchAsyncError(async function (
  req,
  res,
  next
) {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(new ErrorHandlar("Patient not authenticated!", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandlar(
        `${req.user.role} not authorized for this resources!`,
        403
      )
    );
  }

  next();
});
