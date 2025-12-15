import express from "express";
import reservationsControllers from "../controllers/reservationsControllers.js";

const router = express.Router();

router.post("/register", reservationsControllers.createReservation);
router.get("/", reservationsControllers.getAllReservations);
router.get("/:id", reservationsControllers.getReservationById);
router.put("/update/:id", reservationsControllers.updateReservation);
router.delete("/delete/:id", reservationsControllers.deleteReservation);
router.post("/:idReservation/cancel-and-refund", reservationsControllers.cancelAndRefundReservation);

export default router;