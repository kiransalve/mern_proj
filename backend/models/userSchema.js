// Bhai, mongoose library ko import kar rahe hain jo MongoDB ke saath schema define karne aur interaction ke liye use hoti hai.
import mongoose from "mongoose";
// Bhai, validator library ko import kar rahe hain jo email validation ke liye use hoti hai.
import validator from "validator";
// Bhai, bcrypt library ko import kar rahe hain jo password hashing ke liye use hoti hai.
import bcrypt from "bcrypt";
// Bhai, jwt library ko import kar rahe hain jo JSON Web Tokens generate karne ke liye use hoti hai.
import jwt from "jsonwebtoken";

// Bhai, userSchema define kar rahe hain jo ek schema hai MongoDB collection ke liye.
// Is schema me user ke details aur unke validation rules specify kiye gaye hain.
const userSchema = new mongoose.Schema({
  firstName: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai; bina iske user record save nahi hoga.
    minLength: [3, "First name contains atleast 3 charecter"], // Bhai, first name me minimum 3 characters hone chahiye.
  },
  lastName: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    minLength: [3, "Last name contains atleast 3 charecter"], // Bhai, last name me bhi minimum 3 characters hone chahiye.
  },
  email: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    validate: [validator.isEmail, "Please Provide a valid email"], // Bhai, email field ko validate karne ke liye validator.isEmail function use kar rahe hain; agar email invalid hai to error message show hoga.
  },
  phone: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    minLength: [10, "Phone number must be 10 digits"], // Bhai, phone number me exactly 10 digits hone chahiye.
    maxLength: [10, "Phone number must be 10 digits"], // Bhai, phone number ke liye maximum length bhi 10 digits hai.
  },
  nic: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    minLength: [13, "NIC must contain Exact 13 digits"], // Bhai, NIC number me exactly 13 digits hone chahiye.
    maxLength: [13, "NIC must contain Exact 13 digits"], // Bhai, NIC number ke liye maximum length bhi 13 digits hai.
  },
  dob: {
    type: Date, // Bhai, yeh field date type ka hai.
    required: [true, "DOB is required!"], // Bhai, DOB (Date of Birth) field mandatory hai; bina iske data save nahi hoga.
  },
  gender: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    enum: ["Male", "Female"], // Bhai, gender field ke liye valid values "Male" aur "Female" hi hain.
  },
  password: {
    type: String, // Bhai, yeh field string type ka hai.
    minLength: [8, "Password Must contains exact 8 digit"], // Bhai, password me minimum 8 characters hone chahiye.
    required: true, // Bhai, yeh field mandatory hai.
    select: false, // Bhai, password field ko default query results me include nahi karenge.
  },
  role: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    enum: ["Admin", "Patient", "Doctor"], // Bhai, role field ke liye valid values "Admin", "Patient", aur "Doctor" hain.
  },
  doctorDepartment: {
    type: String, // Bhai, yeh field string type ka hai.
    // Yeh optional field hai, agar user "Doctor" role hai to yeh field fill kiya ja sakta hai.
  },
  docAvatar: {
    public_id: String, // Bhai, yeh field string type ka hai, jo avatar image ka public ID store karega.
    url: String, // Bhai, yeh field string type ka hai, jo avatar image ka URL store karega.
  },
});

// Bhai, userSchema ke pre-save hook me password hashing kar rahe hain.
// Yeh function tab chalega jab naya user record save kiya jayega ya password update kiya jayega.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // Bhai, agar password ko modify nahi kiya gaya hai to next function ko call karenge bina hashing ke.
    next();
  }
  // Bhai, password ko hash kar rahe hain using bcrypt; 10 rounds ke salt rounds ke saath.
  this.password = await bcrypt.hash(this.password, 10);
});

// Bhai, yeh method comparePassword ko define kar rahe hain jo entered password ko hashed password ke sath compare karta hai.
// Yeh method login ke time password verification ke liye use hota hai.
userSchema.methods.comparePassword = async function (enteredPassword) {
  // Bhai, bcrypt.compare function ka use karke entered password ko stored hashed password ke sath compare kar rahe hain.
  return await bcrypt.compare(enteredPassword, this.password);
};

// Bhai, yeh method generateJsonWebToken ko define kar rahe hain jo JWT (JSON Web Token) generate karta hai.
// Yeh token authentication aur authorization ke liye use hota hai.
userSchema.methods.generateJsonWebToken = function () {
  // Bhai, jwt.sign function ka use karke token generate kar rahe hain; isme user ID aur expiry time specify kar rahe hain.
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES, // Bhai, token ke expiry time ko environment variable se set kar rahe hain.
  });
};

// Bhai, userSchema ko 'User' model mein convert kar rahe hain.
// Yeh model MongoDB collection ke saath interact karne ke liye use hoga.
export const User = mongoose.model("User", userSchema);
