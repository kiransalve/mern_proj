export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Convert COOKIE_EXPIRE from days to milliseconds
  let cookieExpire = parseInt(process.env.COOKIE_EXPIRE, 10); // Convert the string to an integer

  if (isNaN(cookieExpire)) {
    // Set a default expiration of 7 days if the environment variable is not a valid number
    cookieExpire = 7;
  }

  const expirationDate = new Date(
    Date.now() + cookieExpire * 24 * 60 * 60 * 1000
  );

  const cookieName =
    user.role === "Admin"
      ? "adminToken"
      : user.role === "Patient"
      ? "patientToken"
      : "doctorToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: expirationDate, // Ensure this is a valid Date object
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag for production
      sameSite: "Lax", // Adjust based on your needs
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
