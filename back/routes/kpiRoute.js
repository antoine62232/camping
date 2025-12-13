import express from "express";
import { getKpi, exportKpiCsv  } from "../controllers/kpiController.js";
import { authenticateEmployee, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateEmployee, authorizeRoles(1, 2), getKpi);
router.get("/export-csv", authenticateEmployee, authorizeRoles(1, 2), exportKpiCsv);

export default router;
