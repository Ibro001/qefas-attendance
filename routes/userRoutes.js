import express from "express";
import { loginUser, logoutUser, signupUser, getUsers, deleteUser } from "../controllers/userController.js";


const router = express.Router();


router.post("/signup",  signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getUsers);
router.delete("/:userId", deleteUser);


export default router;
 