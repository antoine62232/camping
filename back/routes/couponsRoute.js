import express from "express";
import couponsController from "../controllers/couponsController.js";

const router = express.Router();

router.post("/register", couponsController.createCoupon);
router.get("/", couponsController.getAllCoupons);
router.get("/:id", couponsController.getCouponById);
router.put("/update/:id", couponsController.updateCoupon);
router.delete("/delete/:id", couponsController.deleteCoupon);

export default router;
