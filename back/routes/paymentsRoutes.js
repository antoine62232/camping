import express from "express";
import paymentsController from "../controllers/paymentsController.js";

const router = express.Router();

router.post("/register", paymentsController.createPayment);
router.get("/", paymentsController.getAllPayments);
router.get("/:id", paymentsController.getPaymentById);
router.put("/update/:id", paymentsController.updatePayment);
router.delete("/delete/:id", paymentsController.deletePayment);

export default router;
