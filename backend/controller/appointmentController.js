import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandlar from "../middleware/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "nic",
  "dob",
  "gender",
  "appointment_date",
  "department",
  "doctor_firstName",
  "doctor_lastName",
  "hasVisited",
  "address",
];

const findMissingFields = (fields, data) => {
  return fields.filter((field) => !data[field]);
};

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const requestData = req.body;
  const missingFields = findMissingFields(requiredFields, requestData);

  if (missingFields.length > 0) {
    return next(
      new ErrorHandlar(`Missing fields: ${missingFields.join(", ")}`, 400)
    );
  }

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

  const doctors = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (doctors.length === 0) {
    return next(new ErrorHandlar("Doctor Not Found", 404));
  }

  if (doctors.length > 1) {
    return next(
      new ErrorHandlar(
        "Doctors Conflict! Please contact through email or phone!",
        404
      )
    );
  }

  const doctorId = doctors[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
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

  res.status(200).json({
    success: true,
    message: "Appointment sent successfully!",
    appointment,
  });
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const appointment = await Appointment.find();
  res.status(200).json({
    success: true,
    appointment,
  });
});

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandlar("Appointment not found!", 404));
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      appointment,
    });
  }
);

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandlar("Appointment not found!", 404));
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment deleted!",
  });
});
