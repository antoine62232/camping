// src/pages/ReservationPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReservationSearchBar from "../components/ReservationSearchBar";
import { getAllAccommodations } from "../services/accommodationService";
import { getAllOptions } from "../services/optionsService";

function ReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { accommodationId, startDate, endDate, adults, children } =
    location.state || {};

  // State de la recherche actuelle
  const [currentAccommodationId, setCurrentAccommodationId] = useState(
    accommodationId || ""
  );
  const [currentStartDate, setCurrentStartDate] = useState(startDate || null);
  const [currentEndDate, setCurrentEndDate] = useState(endDate || null);
  const [currentAdults, setCurrentAdults] = useState(adults || 2);
  const [currentChildren, setCurrentChildren] = useState(children || 0);

  // Données back
  const [accommodations, setAccommodations] = useState([]);
  const [options, setOptions] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({});

  // Chargement hébergements + options
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
      .then((res) => {
        console.log("OPTIONS API ===>", res.data);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.options || res.data.data || [];
        console.log("OPTIONS UTILISÉES ===>", data);
        setOptions(data);
      })
      .catch((err) => console.error("Erreur options", err));
  }, []);

  const safeOptions = Array.isArray(options) ? options : [];
  console.log("SAFE OPTIONS DANS RENDER ===>", safeOptions);

  // Mise à jour quantité d’une option
  const setOptionQuantity = (optId, quantity) => {
    setSelectedOptions((prev) => {
      const q = Math.max(0, quantity);
      if (q === 0) {
        const copy = { ...prev };
        delete copy[optId];
        return copy;
      }
      return {
        ...prev,
        [optId]: { quantity: q },
      };
    });
  };

  // Calcul des prix
  const priceData = useMemo(() => {
    if (!currentStartDate || !currentEndDate) {
      return { basePrice: 0, optionsPrice: 0, totalPrice: 0, nights: 0 };
    }

    const start = new Date(currentStartDate);
    const end = new Date(currentEndDate);
    const diffTime = end - start;
    const nights = Math.max(1, diffTime / (1000 * 60 * 60 * 24));

    const acc = accommodations.find(
      (a) => String(a.id) === String(currentAccommodationId)
    );
    const basePriceAccommodation = acc?.basePriceAccommodation || 0;

    const basePrice = basePriceAccommodation * nights;

    const optionsPrice = safeOptions.reduce((sum, opt) => {
      const sel = selectedOptions[opt.idOption];
      if (!sel || !sel.quantity) return sum;

      const qty = sel.quantity;
      let line = 0;

      if (opt.durationType === "per_night") {
        line = Number(opt.unitPrice) * nights * qty;
      } else if (opt.durationType === "per_stay") {
        line = Number(opt.unitPrice) * qty;
      }

      return sum + line;
    }, 0);

    const totalPrice = basePrice + optionsPrice;

    return { basePrice, optionsPrice, totalPrice, nights };
  }, [
    currentStartDate,
    currentEndDate,
    currentAccommodationId,
    accommodations,
    safeOptions,
    selectedOptions,
  ]);

  // Quand la SearchBar de cette page change quelque chose
  const handleSearchChange = (search) => {
    setCurrentAccommodationId(search.accommodationId || "");
    setCurrentStartDate(search.startDate || null);
    setCurrentEndDate(search.endDate || null);
    setCurrentAdults(search.adults || 2);
    setCurrentChildren(search.children || 0);
  };

  const handleContinue = () => {
    navigate("/reservation/confirmation", {
      state: {
        accommodationId: currentAccommodationId,
        startDate: currentStartDate,
        endDate: currentEndDate,
        adults: currentAdults,
        children: currentChildren,
        selectedOptions,
        totalPrice: priceData.totalPrice,
      },
    });
  };

  return (
    <Box sx={{ bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Réservation
        </Typography>

        {/* Récapitulatif */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: "section.main" }}>
          <Typography variant="h6" gutterBottom>
            Récapitulatif de votre séjour
          </Typography>
          <Typography>
            Hébergement : {currentAccommodationId || "Tous les hébergements"}
          </Typography>
          <Typography>Arrivée : {currentStartDate || "-"}</Typography>
          <Typography>Départ : {currentEndDate || "-"}</Typography>
          <Typography>
            Personnes : {currentAdults} adulte(s), {currentChildren} enfant(s)
          </Typography>
          {priceData.nights > 0 && (
            <Typography sx={{ mt: 1 }}>
              Nombre de nuits : {priceData.nights}
            </Typography>
          )}
        </Paper>

        {/* Barre de recherche modifiable */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: "section.main" }}>
          <ReservationSearchBar
            accommodations={accommodations}
            defaultAccommodationId={currentAccommodationId}
            onSearch={handleSearchChange}
          />
        </Paper>

        {/* Options + total */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: "section.main" }}>
          <Typography variant="h6" gutterBottom>
            Options
          </Typography>

          <Stack spacing={1}>
            {safeOptions.map((opt) => {
              const sel = selectedOptions[opt.idOption];
              const quantity = sel?.quantity ?? 0;

              return (
                <Box
                  key={opt.idOption}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "background.default",
                    p: 1.5,
                    borderRadius: 1,
                  }}
                >
                  <Box>
                    <Typography fontWeight="500">{opt.nameOption}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {opt.descriptionOption}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {opt.durationType === "per_night"
                        ? `${opt.unitPrice} € / nuit`
                        : `${opt.unitPrice} € / séjour`}
                    </Typography>
                  </Box>

                  {/* Zone de choix quantité */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setOptionQuantity(opt.idOption, quantity - 1)
                      }
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <TextField
                      value={quantity}
                      onChange={(e) =>
                        setOptionQuantity(
                          opt.idOption,
                          Number(e.target.value) || 0
                        )
                      }
                      size="small"
                      type="number"
                      inputProps={{
                        min: 0,
                        style: { textAlign: "center", width: 40 },
                      }}
                    />

                    <IconButton
                      size="small"
                      onClick={() =>
                        setOptionQuantity(opt.idOption, quantity + 1)
                      }
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={0.5}>
            <Typography>
              Prix de base : {priceData.basePrice.toFixed(2)} €
            </Typography>
            <Typography>
              Options : {priceData.optionsPrice.toFixed(2)} €
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              Total estimé : {priceData.totalPrice.toFixed(2)} €
            </Typography>
          </Stack>
        </Paper>

        {/* Bouton continuer */}
        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleContinue}
            disabled={!currentStartDate || !currentEndDate}
          >
            Continuer vers le paiement
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ReservationPage;
