import express from "express";
import reservationsOptionsController from "../controllers/reservationsOptionsController.js";

const router = express.Router();


router.post("/add", reservationsOptionsController.addReservationOption);
router.get("/by-reservation/:reservationId", reservationsOptionsController.getOptionsByReservation);
router.put("/update", reservationsOptionsController.updateReservationOption);
router.delete("/delete", reservationsOptionsController.deleteReservationOption);

export default router;
