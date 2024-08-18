// Bhai, yeh mongoose library ko import kar rahe hain jo MongoDB ke saath interact karne ke liye use hoti hai.
// Mongoose ek ORM hai jo MongoDB ke operations ko simplify karta hai.
import mongoose from "mongoose";

// Bhai, dbConnect function define kar rahe hain jo MongoDB se connection establish karta hai.
export const dbConnect = () => {
  // Bhai, mongoose.connect function ko use karke database se connect kar rahe hain.
  // process.env.MONGO_URI se MongoDB URI le rahe hain jo environment variables mein store hota hai.
  // dbName option se specify kar rahe hain ki kis database se connect karna hai.
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN-booking", // Bhai, yeh database name hai jisse connect hona hai.
    })
    .then(() => {
      // Bhai, agar connection successful hota hai, to console pe message print karenge.
      console.log("Connected to database"); // Bhai, yeh message tab aayega jab database se successfully connect ho jayenge.
    })
    .catch((err) => {
      // Bhai, agar connection me koi error aati hai, to us error ko catch karenge aur console pe print karenge.
      console.log(`Some error occured while connecting - ${err}`); // Bhai, yeh error message tab aayega jab connection establish nahi hota.
    });
};
