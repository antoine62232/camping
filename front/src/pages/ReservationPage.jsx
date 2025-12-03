import { Box, Typography, Grid } from "@mui/material";
import ReservationForm from "../components/ReservationForm";
import { submitReservation } from "../api/mockReservations";
import { simulatePrice } from "../api/mockPricing";
import { checkAvailability } from "../api/mockDisponibility";
import { useState } from "react";

function ReservationPage() {
  const [simulation, setSimulation] = useState(null);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);

  const handleFormChange = (values) => {
    setSimulation(simulatePrice(values));

    if (values.arrivalDate && values.departureDate && values.accommodationId) {
      const isAvailable = checkAvailability(
        values.arrivalDate,
        values.departureDate,
        values.accommodationId
      );
      setAvailabilityStatus(isAvailable);
    } else {
      setAvailabilityStatus(null);
    }
  };

  const handleReservationSubmit = async (values, formikHelpers) => {
    try {
      const response = await submitReservation(values);
      console.log("Réservation créée:", response);
      setSimulation(simulatePrice(values));
      formikHelpers.setSubmitting(false);
    } catch (error) {
      console.error("Erreur mock reservation:", error);
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Box sx={{ mx: 2, my: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              bgcolor: "section.main",
              border: 1,
              borderColor: "separator.default",
            }}
          >
            <Typography variant="h1" gutterBottom>
              Réserver votre séjour
            </Typography>
            <ReservationForm
              onSubmit={handleReservationSubmit}
              onChange={handleFormChange}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={(theme) => ({ p: 3, boxShadow: theme.shadows.customSoft })}>
            <Typography variant="h2" gutterBottom>
              Estimation de votre séjour
            </Typography>

            {availabilityStatus !== null && (
              <Box
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: availabilityStatus ? "success.light" : "error.light",
                  border: `1px solid ${
                    availabilityStatus ? "#4caf50" : "#f44336"
                  }`,
                }}
              >
                <Typography
                  variant="body1"
                  color={availabilityStatus ? "success.main" : "error.main"}
                  fontWeight={500}
                >
                  {availabilityStatus
                    ? "✅ Dates disponibles !"
                    : "❌ Dates indisponibles"}
                </Typography>
              </Box>
            )}

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
                  Total : {simulation.total?.toFixed(2) || "0.00"} €
                </Typography>
              </>
            ) : (
              <Typography variant="body2">
                Remplissez le formulaire à gauche pour voir une estimation en
                temps réel.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReservationPage;
