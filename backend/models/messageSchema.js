// Bhai, mongoose library ko import kar rahe hain jo MongoDB ke saath schema banane aur interaction ke liye use hoti hai.
import mongoose from "mongoose";

// Bhai, validator library ko import kar rahe hain jo input validation (jaise email validation) ke liye use hoti hai.
import validator from "validator";

// Bhai, messageSchema define kar rahe hain jo ek schema hai MongoDB collection ke liye.
// Is schema mein fields aur unke validation rules specify kiye gaye hain.
const messageSchema = new mongoose.Schema({
  firstName: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai; bina iske data save nahi hoga.
    minLength: [3, "First name contains atleast 3 charecter"], // Bhai, minimum length validation hai ki first name mein kam se kam 3 characters hone chahiye.
  },
  lastName: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    minLength: [3, "Last name contains atleast 3 charecter"], // Bhai, last name ke liye bhi minimum 3 characters ki requirement hai.
  },
  email: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    validate: [validator.isEmail, "Please Provide a valid email"], // Bhai, email field ko validate karne ke liye validator.isEmail function use kar rahe hain; agar email invalid hai to error message show hoga.
  },
  phone: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    minLength: [10, "Phone number must be 10 digits"], // Bhai, phone number ke liye minimum length 10 digits hai.
    maxLength: [10, "Phone number must be 10 digits"], // Bhai, phone number ke liye maximum length bhi 10 digits hai.
  },
  message: {
    type: String, // Bhai, yeh field string type ka hai.
    required: true, // Bhai, yeh field mandatory hai.
    minLength: [10, "Message must be more than 10 charecter"], // Bhai, message ke liye minimum length 10 characters hai.
  },
});

// Bhai, messageSchema ko 'Message' model mein convert kar rahe hain.
// Yeh model MongoDB collection ke saath interact karne ke liye use hoga.
export const Message = mongoose.model("Message", messageSchema);
