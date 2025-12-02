import { Box, Typography, Grid } from "@mui/material";
import ReservationForm from "../components/ReservationForm";
import { submitReservation } from "../api/mockReservations";
import { simulatePrice } from "../api/mockPricing";
import { useState } from "react";

function ReservationPage() {
  const [simulation, setSimulation] = useState(null);

  const handleFormChange = (values) => {
    setSimulation(simulatePrice(values));
  };

  const handleReservationSubmit = async (values, formikHelpers) => {
    try {
      const response = await submitReservation(values);
      console.log('Réservation créée:', response);
      setSimulation(simulatePrice(values));
      formikHelpers.setSubmitting(false);
    } catch (error) {
      console.error("Erreur mock reservation:", error);
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Box sx={{ mx: 4, my: 10 }}>
      <Grid container spacing={4}>
        {/* Formulaire */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, bgcolor: "section.main", border: 1, borderColor: "separator.default" }}>
            <Typography variant="h1" gutterBottom>
              Réserver votre séjour
            </Typography>
            <ReservationForm onSubmit={handleReservationSubmit} onChange={handleFormChange} />
          </Box>
        </Grid>

        {/* Estimation */}
        <Grid item xs={12} md={6}>
          <Box sx={(theme) => ({ p: 3, boxShadow: theme.shadows.customSoft })}>
            <Typography variant="h2" gutterBottom>
              Estimation de votre séjour
            </Typography>

            {simulation ? (
              <>
                <Typography variant="body1">
                  Nuits : {simulation.nights || 0}
                </Typography>
                {simulation.breakdown?.map((item, i) => (
                  <Typography key={i} variant="body1">
                    {item.label} : {item.amount.toFixed(2)} €
                  </Typography>
                ))}
                <Typography variant="h2" color="primary">
                  Total : {simulation.total?.toFixed(2) || '0.00'} €
                </Typography>
              </>
            ) : (
              <Typography variant="body2">
                Remplissez le formulaire à gauche pour voir une estimation en temps réel.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReservationPage;
