import express from "express";
import reservationsControllers from "../controllers/reservationsControllers.js";

const router = express.Router();

router.post("/register", reservationsControllers.createReservation);

export default router;
