// Bhai, Express framework ko import kar rahe hain, jo ek minimalist web framework hai Node.js ke liye.
// Isse HTTP requests handle karne mein aasan hota hai.
import express from "express";

// Bhai, dotenv module ka config function import kar rahe hain, jo environment variables ko read karta hai
// aur unko process.env mein set kar deta hai, taaki secure cheezein (jaise API keys) env file mein store rahe.
import { config } from "dotenv";

// Bhai, yeh cors module hai, jo Cross-Origin Resource Sharing ko handle karta hai.
// Iska use hota hai taaki humari app dusre domains se aane wali requests ko allow kar sake.
import cors from "cors";

// Bhai, cookie-parser ka use karke cookies ko handle kar rahe hain, jo client side se server pe aati hain.
// Yeh cookies ko parse karke req.cookies mein daal deta hai, taaki hum unko access kar sakein.
import cookieParser from "cookie-parser";

// Bhai, express-fileupload module ka use kar rahe hain jo file uploads ko handle karta hai.
// Iske through, users apne files ko server pe upload kar paate hain.
import fileUpload from "express-fileupload";

// Bhai, yeh apna database connection ka module hai, jo humne khud likha hai.
// Isse MongoDB ya jo bhi database hai, uske saath connection banate hain.
import { dbConnect } from "./database/dbconnect.js";

// Bhai, messageRouter ko import kar rahe hain, jo ek router hai sab message related routes ko handle karne ke liye.
// Is router ke through message bhejne aur receive karne wale routes set kiye jaate hain.
import messageRouter from "./router/messageRouter.js";

// Bhai, errorMiddleware import kar rahe hain jo app mein koi bhi error aata hai, usko handle karta hai.
// Isse saare errors ko pakad ke, ek common format mein user ko bheja jaata hai.
import { errorMiddleware } from "./middleware/errorMiddleware.js";

// Bhai, express ka ek naya app banaya gaya hai, jo poori web application ko represent karta hai.
// Is app mein hum routes, middleware, aur aur bhi functionality daalenge.
const app = express();

// Bhai, config function ka use kar ke environment variables load kar rahe hain,
// jo "./config/config.env" file mein stored hain. Isse sensitive data secure rehta hai.
config({ path: "./config/config.env" });

// Bhai, CORS (Cross-Origin Resource Sharing) middleware set kar rahe hain taaki humari app specific origins
// se aane wali requests ko allow kar sake. Jaise humari frontend app aur dashboard ko allow kar rahe hain.
app.use(
  cors({
    origin: [process.env.FRONT_END_URL, process.env.DASHBOARD_URL], // Bhai, ye specific URLs allowed hain.
    methods: ["GET", "POST", "PUT", "DELETE"], // Bhai, yeh HTTP methods ko allow kar rahe hain.
    credentials: true, // Bhai, yeh option allow karta hai cookies aur headers ko pass hone ke liye.
  })
);

// Bhai, yeh middleware hai cookie-parser jo client se aane wali cookies ko parse karke
// unhe req.cookies object mein daal deta hai, taaki hum unko read aur manage kar sake.
app.use(cookieParser());

// Bhai, express.json() middleware ka use kar rahe hain taaki humari app ko JSON format mein aane wali requests
// ko parse karke handle kar sake. Isse JSON data ko request body se access karna aasan hota hai.
app.use(express.json());

// Bhai, express.urlencoded() ka use kar rahe hain taaki URL encoded data ko handle kar sake.
// Yeh basically form-data ko request body se parse karne ka kaam karta hai.
app.use(express.urlencoded({ extended: true }));

// Bhai, fileUpload middleware ka setup kar rahe hain jo files ko upload karne ka kaam karega.
// Temporary files ko /tmp/ directory mein store kar rahe hain taaki unko process kar sakein.
app.use(
  fileUpload({
    useTempFiles: true, // Bhai, temporary files ka option enable kiya hai.
    tempFileDir: "/tmp/", // Bhai, temporary files ko is directory mein store karenge.
  })
);

// Bhai, hum messageRouter ko "/api/v1/message" path pe mount kar rahe hain.
// Iska matlab jo bhi requests "/api/v1/message" pe aayengi, wo messageRouter handle karega.
app.use("/api/v1/message", messageRouter);

// Bhai, dbConnect() function ko call kar rahe hain jo MongoDB se connection banane ka kaam karega.
// Isse humara app aur database ke beech link ban jata hai.
dbConnect();

// Bhai, sabse last mein hum error handling middleware ko mount kar rahe hain.
// Agar koi bhi request ke dauran error aata hai, to yeh middleware usko pakad ke handle karega.
app.use(errorMiddleware);

// Bhai, app ko export kar rahe hain taaki hum isko server pe use kar sakein.
export default app;
