import express from "express";
import { createCheckIn, createCheckout, fetchCheckIns, fetchCheckOuts  } from "../controllers/attendanceController.js";

const router = express.Router();


router.post("/checkin",  createCheckIn);
router.post("/checkout",  createCheckout);
router.get("/checkins",  fetchCheckIns);
router.get("/checkouts",  fetchCheckOuts);


export default router;
