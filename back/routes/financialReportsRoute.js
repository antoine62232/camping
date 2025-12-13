import express from "express";
import { getFinancialReport, exportFinancialCsv } from "../controllers/financialReportsController.js";
import { authenticateEmployee, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/finance", authenticateEmployee, authorizeRoles(1, 2), getFinancialReport);
router.get("/export-csv", authenticateEmployee, authorizeRoles(1, 2), exportFinancialCsv);

export default router;
