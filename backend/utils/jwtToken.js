// Bhai, yeh function `generateToken` ek user object, ek message, status code aur response object ko le kar
// ek JSON Web Token generate karta hai aur use HTTP response ke sath set karta hai.

export const generateToken = (user, message, statusCode, res) => {
  // Bhai, user object se JSON Web Token generate kar rahe hain.
  const token = user.generateJsonWebToken();

  // Bhai, cookie ka naam user ke role ke basis pe decide karte hain.
  // Agar user ka role "Admin" hai, to cookie ka naam "adminToken" hoga.
  // Agar role "Admin" nahi hai, to cookie ka naam "patientToken" hoga.
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  // Bhai, response object ko use karke status code set karte hain,
  // aur cookie ko set karte hain jo token ko store karta hai.
  // Cookie ki expiry date ko environment variable se milne wale `COOKIE_EXPRIRE` ke basis pe set karte hain.
  res
    .status(statusCode) // Status code set karte hain jo response bhejne ke sath aayega.
    .cookie(cookieName, token, {
      // Cookie ki expiry date ko calculate karte hain.
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPRIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      // Response ke sath success aur message bhejte hain,
      // saath hi user object aur token bhi bhejte hain.
      success: true, // Success ka indicator
      message, // Response ka message
      user, // User ka data
      token, // Generated token
    });
};
