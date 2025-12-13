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

export const exportFinancialCsv = async (req, res) => {
  try {
    const { from, to } = req.query; // format 'YYYY-MM-DD'
    const rows = await financialModel.getFinancialReport(from, to);

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="rapport-financier.csv"'
    );

    const headers = [
      "idPayment",
      "datePayment",
      "amount",
      "paymentMethod",
      "paymentStatus",
      "idReservation",
      "statusReservation",
    ];
    const csvRows = [headers.join(",")];

    rows.forEach((p) => {
      csvRows.push(
        [
          p.idPayment,
          p.datePayment,
          p.amount,
          p.paymentMethod,
          p.paymentStatus,
          p.idReservation,
          p.statusReservation,
        ].join(",")
      );
    });

    res.status(200).send(csvRows.join("\n"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur export rapport financier CSV" });
  }
};