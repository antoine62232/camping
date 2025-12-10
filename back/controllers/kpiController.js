import kpiModel from "../models/kpiModel.js";

export const getKpi = async (req, res) => {
  try {
    const { from, to } = req.query;

    const fromDate = from || "2025-01-01";
    const toDate = to || "2025-12-31";

    const kpi = await kpiModel.getKpi(fromDate, toDate);

    res.status(200).json(kpi);
  } catch (error) {
    console.error("Erreur KPI:", error);
    res.status(500).json({ message: "Erreur lors du calcul des KPI" });
  }
};
