import financialReportsModel from "../models/financialReportsModel.js";

export const getFinancialReport = async (req, res) => {
  try {
    const { from, to } = req.query;

    const fromDate = from || "2025-01-01";
    const toDate = to || "2025-12-31";

    const report = await financialReportsModel.getFinancialReport(
      fromDate,
      toDate
    );

    res.status(200).json({
      financialReport: report,
      message: "Rapport financier récupéré avec succès",
    });
  } catch (error) {
    console.error("Erreur rapport financier:", error);
    res
      .status(500)
      .json({ message: "Erreur lors du chargement du rapport financier" });
  }
};
