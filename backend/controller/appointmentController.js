import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandlar from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

// Bhai, required fields ka array bana rahe hain jisme appointment ke liye zaroori fields hain.
const requiredFields = [
  "firstName", // Patient ka first name
  "lastName", // Patient ka last name
  "email", // Patient ka email
  "phone", // Patient ka phone number
  "nic", // Patient ka NIC
  "dob", // Patient ki date of birth
  "gender", // Patient ka gender
  "appointment_date", // Appointment ki date
  "department", // Doctor ka department
  "doctor_firstName", // Doctor ka first name
  "doctor_lastName", // Doctor ka last name
  "hasVisited", // Patient ne visit kiya ya nahi
  "address", // Patient ka address
];

// Bhai, yeh function missing fields ko find karne ke liye banaya gaya hai.
const findMissingFields = (fields, data) => {
  return fields.filter((field) => !data[field]); // Bhai, agar koi field missing hai to usse return karte hain.
};

// Bhai, appointment post karne ka function hai yeh.
export const postAppointment = catchAsyncError(async (req, res, next) => {
  const requestData = req.body; // Bhai, request ke data ko extract kar rahe hain.
  const missingFields = findMissingFields(requiredFields, requestData); // Bhai, check kar rahe hain ki koi field missing hai ya nahi.

  // Bhai, agar koi field missing hai to error throw kar rahe hain.
  if (missingFields.length > 0) {
    return next(
      new ErrorHandlar(`Missing fields: ${missingFields.join(", ")}`, 400) // Missing fields ko message mein dikhate hain.
    );
  }

  // Bhai, request data se fields ko nikal rahe hain.
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = requestData;

  // Bhai, doctor ko database se find kar rahe hain.
  const doctors = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  // Bhai, agar doctor nahi mila to error throw karte hain.
  if (doctors.length === 0) {
    return next(new ErrorHandlar("Doctor Not Found", 404));
  }

  // Bhai, agar ek se zyada doctors mil gaye to conflict message bhejte hain.
  if (doctors.length > 1) {
    return next(
      new ErrorHandlar(
        "Doctors Conflict! Please contact through email or phone!",
        404
      )
    );
  }

  // Bhai, doctor ka ID aur patient ka ID set kar rahe hain.
  const doctorId = doctors[0]._id;
  const patientId = req.user._id;

  // Bhai, nayi appointment ko create kar rahe hain.
  await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  // Bhai, agar appointment successful hui to success message bhej rahe hain.
  res.status(200).json({
    success: true,
    message: "Appointment sent successfully!",
  });
});
