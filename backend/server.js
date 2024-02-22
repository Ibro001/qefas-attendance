import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"; 
import adminRoutes from "./routes/adminRoutes.js";  
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();
dotenv.config();

connectDB();

app.use(express.json({ extended: false })); 

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());
 
// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/attendance", attendanceRoutes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
