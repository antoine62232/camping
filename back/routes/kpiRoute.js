import express from "express";
import { getKpi } from "../controllers/kpiController.js";

const router = express.Router();

router.get("/", getKpi);

export default router;
