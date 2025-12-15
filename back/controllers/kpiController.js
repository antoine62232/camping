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

export const exportKpiCsv = async (req, res) => {
  try {
    const { from, to } = req.query;
    const kpi = await kpiModel.getKpi(from, to);

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="kpi.csv"'
    );

    const headers = [
      "from",
      "to",
      "reservationsCount",
      "monthlyRevenue",
      "averageBasket",
      "occupancyRate",
    ];
    const csvRows = [headers.join(",")];

    csvRows.push(
      [
        from,
        to,
        kpi.reservationsCount,
        kpi.monthlyRevenue,
        kpi.averageBasket,
        kpi.occupancyRate,
      ].join(",")
    );

    res.status(200).send(csvRows.join("\n"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur export KPI CSV" });
  }
};
