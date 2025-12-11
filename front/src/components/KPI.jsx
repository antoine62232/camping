import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { getKpi } from "../services/kpiService";

function KPI() {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKpi = async () => {
      try {
        const { data } = await getKpi({
          from: "2025-01-01",
          to: "2025-12-31",
        });
        setKpi(data);
      } catch (error) {
        console.error("Erreur KPI:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKpi();
  }, []);

  if (loading) return <Typography>Chargement des indicateurs...</Typography>;
  if (!kpi) return <Typography>Aucun indicateur disponible.</Typography>;

  return (
    <Box>
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
