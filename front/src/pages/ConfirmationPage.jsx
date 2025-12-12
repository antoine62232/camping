import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { getAllAccommodations } from "../services/accommodationService";
import { getAllOptions } from "../services/optionsService";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPaymentIntent } from "../services/paymentService";
import CheckoutForm from "../components/CheckoutForm";
import bgVector from "../assets/Topographic 3.svg"

// Clé publique Stripe (à mettre dans .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function ReservationConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const {
    accommodationId,
    startDate,
    endDate,
    adults,
    children,
    selectedOptions = {},
    totalPrice,
  } = location.state || {};

  const [accommodations, setAccommodations] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAllAccommodations()
      .then((res) => {
        const api = res.data;
        const formatted = api.map((item, index) => ({
          id: item.idAccommodation ?? index + 1,
          title: item.typeAccommodation,
          description: item.descriptionAccommodation,
          basePriceAccommodation: Number(item.basePriceAccommodation),
        }));
        setAccommodations(formatted);
      })
      .catch((err) => console.error("Erreur hébergements", err));

    getAllOptions()
      .then((res) => setOptions(res.data))
      .catch((err) => console.error("Erreur options", err));
  }, []);

  useEffect(() => {
    if (!totalPrice) return;

    const initPaymentIntent = async () => {
      try {
        setLoadingPayment(true);
        setPaymentError("");

        // ICI on utilise le service importé, qui retourne déjà { data }
        const { data } = await createPaymentIntent(
          Math.round(Number(totalPrice) * 100)
        );

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Erreur création PaymentIntent", error);
        setPaymentError("Impossible d'initialiser le paiement.");
      } finally {
        setLoadingPayment(false);
      }
    };

    initPaymentIntent();
  }, [totalPrice]);

  const safeOptions = Array.isArray(options) ? options : [];

  // Détails pour le récapitulatif
  const recap = useMemo(() => {
    const acc = accommodations.find(
      (a) => String(a.id) === String(accommodationId)
    );

    const nights =
      startDate && endDate
        ? Math.max(
            1,
            (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
          )
        : 0;

    const selectedOptionsDetails = safeOptions
      .filter((opt) => selectedOptions[opt.idOption])
      .map((opt) => ({
        ...opt,
        quantity: selectedOptions[opt.idOption].quantity,
      }));

    return {
      accommodationTitle: acc?.title || "Hébergement",
      accommodationDescription: acc?.description || "",
      nights,
      selectedOptionsDetails,
    };
  }, [
    accommodations,
    accommodationId,
    startDate,
    endDate,
    safeOptions,
    selectedOptions,
  ]);

  const handleCancel = () => {
    navigate("/reservation", { replace: true });
  };

  return (
    <Box sx={{ bgcolor: "background.default", py: 4, minHeight: "100vh", backgroundImage: `url(${bgVector})`,
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        backgroundPosition: "top center", }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Confirmation de paiement
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr" },
            gap: 3,
            mt: 3,
          }}
        >
          {/* Colonne gauche : récapitulatif */}
          <Paper sx={{ p: 3, bgcolor: "section.main" }}>
            <Typography variant="h6" gutterBottom>
              Récapitulatif de la commande
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={1}>
              <Typography fontWeight="500">
                Hébergement : {recap.accommodationTitle}
              </Typography>
              {recap.accommodationDescription && (
                <Typography variant="body2" color="text.secondary">
                  {recap.accommodationDescription}
                </Typography>
              )}
              <Typography>
                Arrivée : {startDate || "-"} | Départ : {endDate || "-"}
              </Typography>
              <Typography>Nombre de nuits : {recap.nights || "-"}</Typography>
              <Typography>
                Personnes : {adults} adulte(s), {children} enfant(s)
              </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight="500" gutterBottom>
              Options choisies
            </Typography>
            {recap.selectedOptionsDetails.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Aucune option sélectionnée.
              </Typography>
            ) : (
              <Stack spacing={0.5}>
                {recap.selectedOptionsDetails.map((opt) => (
                  <Typography key={opt.idOption} variant="body2">
                    {opt.nameOption} × {opt.quantity}
                  </Typography>
                ))}
              </Stack>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold">
              Total à payer : {Number(totalPrice || 0).toFixed(2)} €
            </Typography>
          </Paper>

          {/* Colonne droite : formulaire de paiement Stripe */}
          <Paper sx={{ p: 3, bgcolor: "section.main" }}>
            <Typography variant="h6" gutterBottom>
              Formulaire de paiement
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {loadingPayment && (
              <Typography variant="body2" color="text.secondary">
                Initialisation du paiement...
              </Typography>
            )}

            {paymentError && (
              <Typography variant="body2" color="error">
                {paymentError}
              </Typography>
            )}

            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: { theme: "stripe" },
                }}
              >
                <CheckoutForm />
              </Elements>
            )}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button variant="outlined" color="primary" onClick={handleCancel}>
                Annuler
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default ReservationConfirmationPage;
