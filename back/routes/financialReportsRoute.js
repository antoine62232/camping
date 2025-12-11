import express from "express";
import { getFinancialReport } from "../controllers/financialReportsController.js";

const router = express.Router();

router.get("/finance", getFinancialReport);

export default router;
