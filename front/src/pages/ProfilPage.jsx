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
} from "@mui/material";
import { getReservationsByUser } from "../services/reservationsService";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");

  const [completed, setCompleted] = useState([]);
  const [inProgress, setInProgress] = useState([]);

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

  useEffect(() => {
    const raw = localStorage.getItem("client");
    if (!raw) {
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(raw);
    setUser(parsed);
    setAbout(parsed.aboutMe || "");
    setLocation(parsed.location || "");
  }, [navigate]);

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
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid item xs={12} md={8}>
          {/* Bloc édition profil */}
          <Paper sx={{ p: 3, borderRadius: 3, mb: 4, bgcolor: "section.main" }}>
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

          {/* Bloc historique */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
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
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
