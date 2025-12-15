import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { getKpi, downloadKpiCsv } from "../services/kpiService";

function KPI() {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [from] = useState("2025-01-01");
  const [to] = useState("2025-12-31");

  useEffect(() => {
    const fetchKpi = async () => {
      try {
        const { data } = await getKpi({ from, to });
        setKpi(data);
      } catch (error) {
        console.error("Erreur KPI:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKpi();
  }, [from, to]);

  const handleExportKpiCsv = async () => {
    try {
      const res = await downloadKpiCsv({ from, to });
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "text/csv" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "kpi.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'export KPI CSV.");
    }
  };

  if (loading) return <Typography>Chargement des indicateurs...</Typography>;
  if (!kpi) return <Typography>Aucun indicateur disponible.</Typography>;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" size="small" onClick={handleExportKpiCsv}>
          Exporter KPI (CSV)
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Réservations validées</Typography>
            <Typography variant="h5">{kpi.reservationsCount}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Taux d’occupation</Typography>
            <Typography variant="h5">
              {Math.round(kpi.occupancyRate * 100)}%
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">CA du mois</Typography>
            <Typography variant="h5">
              {kpi.monthlyRevenue.toLocaleString("fr-FR")} €
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Panier moyen</Typography>
            <Typography variant="h5">
              {kpi.averageBasket.toLocaleString("fr-FR")} €
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default KPI;
