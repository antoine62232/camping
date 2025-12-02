// src/pages/ReservationPage.jsx
import { Box, Paper, Typography, Grid } from "@mui/material";
import ReservationForm from "../components/ReservationForm";
import { submitReservation } from "../api/mockReservations";
import { useState } from "react";

function ReservationPage() {
  const [lastReservation, setLastReservation] = useState(null);

  const handleReservationSubmit = async (values, formikHelpers) => {
    try {
      const response = await submitReservation(values);
      setLastReservation(response.data); // servira pour la simulation temps réel
      formikHelpers.setSubmitting(false);
    } catch (error) {
      console.error("Erreur mock reservation:", error);
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Box sx={{ mx: 4, my: 10, justifyItems: "center" }}>
      <Grid container spacing={4}>
        {/* Colonne gauche : formulaire */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, bgcolor: "section.main", border: 1, borderColor: "separator.default" }}>
            <Typography variant="h1" gutterBottom>
              Réserver votre séjour
            </Typography>
            <ReservationForm onSubmit={handleReservationSubmit} />
          </Box>
        </Grid>

        {/* Colonne droite : estimation */}
        <Grid item xs={12} md={6}>
          <Box sx={(theme) => ({ p: 3, boxShadow: theme.shadows.customSoft })}>
            <Typography variant="h2" gutterBottom>
              Estimation de votre séjour
            </Typography>

            {lastReservation ? (
              <>
                <Typography variant="body1">
                  Dates : {lastReservation.arrivalDate} →{" "}
                  {lastReservation.departureDate}
                </Typography>
                <Typography variant="body1">
                  Adultes : {lastReservation.adults} · Enfants :{" "}
                  {lastReservation.children}
                </Typography>
                {/* Plus tard : afficher le prix calculé */}
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
