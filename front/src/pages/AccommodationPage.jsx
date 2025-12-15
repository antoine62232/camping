import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  Stack,
  CircularProgress,
  Alert,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
} from "@mui/material";

// Icônes
import PeopleIcon from "@mui/icons-material/People";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import BedIcon from "@mui/icons-material/Bed";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import TvIcon from "@mui/icons-material/Tv";
import CookieIcon from "@mui/icons-material/Cookie";
import BathroomIcon from "@mui/icons-material/Bathroom";
import bgVector from "../assets/Topographic 3.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Service
import {
  getAccommodationById,
  getOptionsByAccommodationId,
} from "../services/accommodationService";

const AccommodationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [accommodation, setAccommodation] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accomResponse = await getAccommodationById(id);
        const accomData = Array.isArray(accomResponse.data)
          ? accomResponse.data[0]
          : accomResponse.data;

        if (!accomData) throw new Error("Hébergement introuvable");

        setAccommodation({
          id: accomData.idAccommodation,
          title: accomData.typeAccommodation || "Hébergement",
          description: (accomData.descriptionAccommodation || "").replace(
            "c?ur",
            "cœur"
          ),
          price: Number(accomData.basePriceAccommodation) || 0,
          surface: accomData.surfaceAccommodation || 0,
          capacity: accomData.abilityAccommodation || 2,
          equipments: accomData.equipementAccommodation
            ? accomData.equipementAccommodation.split(";")
            : [],
          img:
            accomData.imageAccommodation ||
            "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80",
        });

        try {
          const optionsResponse = await getOptionsByAccommodationId(id);
          setOptions(optionsResponse.data || []);
        } catch (optErr) {
          console.warn("Pas d'options trouvées", optErr);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les détails.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addOption = (option) => {
    // Est-ce que l'option est déjà dans la liste des sélectionnés ?
    const isSelected = selectedOptions.find(
      (o) => o.idOption === option.idOption
    );

    if (isSelected) {
      // Si oui, on la retire (filtre)
      setSelectedOptions(
        selectedOptions.filter((o) => o.idOption !== option.idOption)
      );
    } else {
      // Si non, on l'ajoute
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Prix de base + Somme des prix des options sélectionnées
  const totalPrice = accommodation
    ? accommodation.price +
      selectedOptions.reduce((sum, opt) => sum + Number(opt.unitPrice), 0)
    : 0;

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  if (error)
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={() => navigate("/")}>Retour</Button>
      </Container>
    );
  if (!accommodation) return null;

  const mappedSelectedOptions = selectedOptions.reduce((acc, opt) => {
    acc[opt.idOption] = { quantity: 1 };
    return acc;
  }, {});

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: 6,
        backgroundImage: `url(${bgVector})`,
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        backgroundPosition: "top center",
      }}
    >
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            mb: 3,
            color: "text.secondary",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Retour aux offres
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                height: { xs: 300, md: 500 },
                boxShadow: theme.shadows.customSoft,
              }}
            >
              <Box
                component="img"
                src={accommodation.img}
                alt={accommodation.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                boxShadow: theme.shadows.customSoft,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h2"
                color="primary.main"
                gutterBottom
                sx={{ fontSize: "28px" }}
              >
                {accommodation.title}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ mb: 3 }}
              >
                {accommodation.description}
              </Typography>

              <Stack direction="row" spacing={3} mb={3}>
                <Chip
                  icon={<PeopleIcon />}
                  label={`${accommodation.capacity} Pers.`}
                  variant="outlined"
                />
                <Chip
                  icon={<SquareFootIcon />}
                  label={`${accommodation.surface} m²`}
                  variant="outlined"
                />
              </Stack>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: "18px", fontWeight: "bold" }}
              >
                Services inclus
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 3,
                  flexWrap: "wrap",
                }}
              >
                {accommodation.equipments.map((eq, index) => {
                  const label = eq.trim().toLowerCase();

                  let Icon = BedIcon;

                  if (label.includes("wifi")) Icon = WifiIcon;
                  else if (label.includes("clim")) Icon = AcUnitIcon;
                  else if (label.includes("cuisine")) Icon = CookieIcon;
                  else if (label.includes("tv")) Icon = TvIcon;
                  else if (label.includes("terrasse")) Icon = LocalCafeIcon;
                  else if (label.includes("lits") || label.includes("lit"))
                    Icon = BedIcon;
                  else if (label.includes("électricité"))
                    Icon = WbIncandescentIcon;
                  else if (
                    label.includes("lave-vaisselle") ||
                    label.includes("lave vaisselle")
                  )
                    Icon = BathroomIcon;

                  return (
                    <Tooltip key={index} title={eq.trim()} arrow>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: "section.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "default",
                        }}
                      >
                        <Icon color="primary" fontSize="small" />
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* section options cliquables */}
              {options.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Ajouter des options :
                  </Typography>
                  <List dense disablePadding>
                    {options.map((opt) => {
                      // Vérifie si cette option est active
                      const isSelected = selectedOptions.some(
                        (o) => o.idOption === opt.idOption
                      );

                      return (
                        <ListItem
                          key={opt.idOption}
                          disableGutters
                          // Au clic, on active/désactive
                          onClick={() => addOption(opt)}
                          sx={{
                            cursor: "pointer",
                            borderRadius: 2,
                            mb: 1,
                            p: 1,
                            border: isSelected
                              ? `1px solid ${theme.palette.primary.main}`
                              : "1px solid transparent",
                            bgcolor: isSelected ? "#f0fdf4" : "transparent",
                            transition: "all 0.2s",
                            "&:hover": { bgcolor: "#f5f5f5" },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {isSelected ? (
                              <CheckCircleIcon color="primary" />
                            ) : (
                              <RadioButtonUncheckedIcon color="disabled" />
                            )}
                          </ListItemIcon>

                          <ListItemText
                            primary={opt.nameOption}
                            secondary={`${opt.unitPrice}€`}
                          />
                          {/* Icône décorative à droite */}
                          {opt.nameOption.toLowerCase().includes("déjeuner") ? (
                            <RestaurantIcon fontSize="small" color="action" />
                          ) : opt.nameOption
                              .toLowerCase()
                              .includes("ménage") ? (
                            <CleaningServicesIcon
                              fontSize="small"
                              color="action"
                            />
                          ) : null}
                        </ListItem>
                      );
                    })}
                  </List>
                  <Divider sx={{ my: 3 }} />
                </Box>
              )}

              {/* prix total */}
              <Box
                sx={{
                  bgcolor: theme.palette.section.main,
                  p: 3,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textTransform="uppercase"
                  fontWeight="bold"
                >
                  Total (Hébergement + Options)
                </Typography>

                <Typography
                  variant="h2"
                  color="primary.main"
                  sx={{ mb: 1, fontSize: "36px" }}
                >
                  {totalPrice.toFixed(2)}€
                  <span
                    style={{ fontSize: "16px", color: "#666", fontWeight: 400 }}
                  >
                    /nuit
                  </span>
                </Typography>

                {/* Affiche le détail si des options sont sélectionnées */}
                {selectedOptions.length > 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, fontStyle: "italic" }}
                  >
                    (Dont{" "}
                    {selectedOptions.reduce(
                      (sum, o) => sum + Number(o.unitPrice),
                      0
                    )}
                    € d'options)
                  </Typography>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#236b45" },
                  }}
                  onClick={() =>
                    navigate("/reservation", {
                      state: {
                        accommodationId: accommodation.id,
                        title: accommodation.title,
                        description: accommodation.description,
                        basePriceAccommodation: accommodation.price,
                        selectedOptions: mappedSelectedOptions,
                      },
                    })
                  }
                >
                  Réserver ce séjour
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Box
        component="footer"
        sx={{ bgcolor: "#FDFBF7", py: 6, borderTop: "1px solid #eaeaea" }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={3} justifyContent="center" mb={5}>
            <IconButton color="inherit">
              <FacebookIcon sx={{ fontSize: 30, color: "#333" }} />
            </IconButton>
            <IconButton color="inherit">
              <InstagramIcon sx={{ fontSize: 30, color: "#333" }} />
            </IconButton>
            <IconButton color="inherit">
              <LinkedInIcon sx={{ fontSize: 30, color: "#333" }} />
            </IconButton>
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 5,
              opacity: 0.8,
            }}
          >
            <Divider
              sx={{ width: { xs: "30px", md: "100px" }, bgcolor: "#ccc" }}
            />
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ mx: 2, textAlign: "center", fontWeight: 500 }}
            >
              © 2025 BEAUVERT Projet Dev – Tous droits réservés.
            </Typography>
            <Divider
              sx={{ width: { xs: "30px", md: "100px" }, bgcolor: "#ccc" }}
            />
          </Box>

          {/* Logo Footer */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src="src/assets/Logo_NavBar.png"
              alt="Logo Beauvert"
              sx={{
                height: 80,
                width: 80,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AccommodationPage;
