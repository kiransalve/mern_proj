// Bhai, yeh class ek custom error handler hai jo built-in Error class se extend karta hai.
// Isme ek message aur status code input hota hai, jo error object ko assign kiya jata hai.
class ErrorHandlar extends Error {
  constructor(message, statusCode) {
    super(message); // Bhai, yeh Error class ka constructor call ho raha hai message ke sath
    this.statusCode = statusCode; // Error ka status code set kar rahe hain
  }
}

// Bhai, yeh middleware function hai jo app me errors ko handle karne ke liye hai.
// Isme error, request, response, aur next arguments pass hote hain.
export const errorMiddleware = (err, req, res, next) => {
  // Bhai, agar error ke sath message aur status code nahi hai, to default set kar lo.
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Bhai, check karo kya error duplicate entry ka hai database me.
  if (err.code === 11000) {
    // Agar duplicate error hai, to naya message banao duplicate field ka naam lekar.
    const message = `Duplicate ${Object.keys(err.keyValues)} Entered`;
    err = new ErrorHandlar(message, 400); // Bhai, custom ErrorHandlar ka use karo 400 status code ke sath.
  }

  // Bhai, handle karo agar JSON Web Token invalid hai.
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again..!`;
    err = new ErrorHandlar(message, 400); // Bhai, custom error banao 400 status code ke sath.
  }

  // Bhai, agar token expired ho gaya hai, usko bhi handle karo.
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is invalid, Try again..!`;
    err = new ErrorHandlar(message, 400); // Bhai, expired token ke liye bhi 400 error banao.
  }

  // Bhai, agar error invalid object ID ka ho, usko handle karo (jaise MongoDB ID galat ho).
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}`; // Bhai, error wali field ka naam use karo.
    err = new ErrorHandlar(message, 400); // Bhai, 400 status code ke sath custom error banao.
  }

  // Bhai, agar validation errors hain, unke messages extract karke ek string bana lo.
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message; // Agar koi validation error nahi hai, to sirf error ka message le lo.

  // Bhai, JSON response return karo error message aur status code ke sath.
  return res.status(err.statusCode).json({
    success: false, // Bhai, yeh dikha raha hai ki request unsuccessful thi.
    message: errorMessage, // Detailed error message dena bhai.
  });
};

export default ErrorHandlar; // Bhai, custom ErrorHandlar class ko export kar rahe hain, app ke dusre parts me use ke liye.
