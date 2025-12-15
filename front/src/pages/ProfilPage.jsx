import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVector from "../assets/Topographic 3.svg";
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Grid,
  Avatar,
  TextField,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import { getReservationsByUser } from "../services/reservationsService";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [completed, setCompleted] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  // Chargement user depuis localStorage
  useEffect(() => {
    const raw = localStorage.getItem("client");
    if (!raw) {
      navigate("/auth"); // ou /login
      return;
    }
    const parsed = JSON.parse(raw);
    setUser(parsed);
    setAbout(parsed.aboutMe || "");
    setLocation(parsed.location || "");
  }, [navigate]);

  // Chargement des réservations de l'utilisateur
  useEffect(() => {
    if (!user) return;
    const clientId = user.idUser ?? user.id;

    getReservationsByUser(clientId)
      .then((res) => {
        const all = res.data || [];
        setCompleted(all.filter((r) => r.status === "COMPLETED"));
        setInProgress(all.filter((r) => r.status === "PENDING"));
      })
      .catch(console.error);
  }, [user]);

  if (!user) return null;

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        backgroundImage: `url(${bgVector})`,
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6, justifyItems: "center" }}>
        {/* 2 blocs côte à côte */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Bloc gauche : avatar + identité */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "section.main" }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Avatar sx={{ width: 80, height: 80 }}>
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </Avatar>
              </Box>
              <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
                Téléchargez une photo
              </Button>

              <Typography variant="subtitle2" gutterBottom>
                Vérification d'identité
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Email confirmé
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Paper>
          </Grid>

          {/* Bloc droit : éditer le profil */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "section.main" }}>
              <Typography variant="h6" gutterBottom>
                Éditer le profil
              </Typography>

              <TextField
                label="À propos de moi"
                fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />

              <TextField
                label="Localisation"
                fullWidth
                sx={{ mb: 3 }}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button onClick={() => navigate("/")}>Annuler</Button>
                <Button variant="contained" color="primary">
                  Sauvegarder
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Bloc en dessous : historique des transactions */}
        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "section.main" }}>
          <Typography variant="h6" gutterBottom>
            Historique des transactions
          </Typography>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Compléter
          </Typography>
          {completed.map((r) => (
            <Box
              key={r.idReservation}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 1,
                borderBottom: "1px solid #eee",
              }}
            >
              <Box>
                <Typography variant="body2">{r.accommodationName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(r.startDate).toLocaleDateString()} –{" "}
                  {new Date(r.endDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold">
                {r.totalAmount} €
              </Typography>
            </Box>
          ))}

          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
            En cours
          </Typography>
          {inProgress.map((r) => (
            <Box
              key={r.idReservation}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 1,
                borderBottom: "1px solid #eee",
              }}
            >
              <Box>
                <Typography variant="body2">{r.accommodationName}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(r.startDate).toLocaleDateString()} –{" "}
                  {new Date(r.endDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold">
                {r.totalAmount} €
              </Typography>
            </Box>
          ))}
        </Paper>
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

export default ProfilePage;
