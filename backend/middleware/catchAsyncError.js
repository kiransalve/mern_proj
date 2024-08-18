// Bhai, yeh ek higher-order function hai, matlab ek aisa function jo dusre function ko return karta hai.
// Iska main kaam hai async functions (jaise API calls) me aane wale errors ko handle karna,
// bina har function ke andar try-catch block likhne ke.

export const catchAsyncError = (theFunction) => {
  // Bhai, yeh function ek middleware return karta hai jo req, res, aur next parameters ko leta hai.
  return (req, res, next) => {
    // Hum 'theFunction' ko req, res, aur next ke saath call kar rahe hain aur Promise ki tarah run kar rahe hain.
    // Promise.resolve() ka use kar ke ensure karte hain ki function ek promise return kare.
    // Agar 'theFunction' successfully resolve hota hai, toh sab kuch normal chalega.
    // Agar function reject hota hai (yaani error throw hota hai), toh error ko catch karenge
    // aur next() function ke through error handler middleware ko pass karenge.
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};

// Bhai, yeh wrapper manual try-catch blocks likhne ki zarurat ko hata deta hai har async route handler me.
// Yeh ensure karta hai ki koi bhi unhandled rejection ya error ko catch kiya jaye
// aur error handler middleware se handle karwaya jaye.
