import express from "express";
import { loginAdmin, logoutAdmin, createAdmin, getAdmin, deleteAdmin } from "../controllers/adminController.js";

const router = express.Router();


router.post("/create",  createAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/profile", getAdmin);
router.delete("/:adminId", deleteAdmin);

export default router;
 