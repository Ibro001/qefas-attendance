import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"; 
import adminRoutes from "./routes/adminRoutes.js";  
import attendanceRoutes from "./routes/attendanceRoutes.js";
import path from 'path';
import cors from 'cors';

const __dirname = path.resolve();
const app = express();
app.use(express.json());

app.use(cors());
dotenv.config();

app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
})

connectDB();


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
