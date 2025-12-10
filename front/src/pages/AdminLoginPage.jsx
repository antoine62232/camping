import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";

function AdminLoginPage() {
  const { login } = useEmployeeAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password }); 
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setError("Identifiants invalides");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 360,
          maxWidth: "100%",
          px: 3,
          py: 3,
          borderRadius: 3,
          bgcolor: "section.main",
          boxShadow: (theme) => theme.shadows.customSoft
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, fontSize: 22 }}>
          Connexion employé
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="dense"
            label="Email professionnel"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
          />

          <TextField
            fullWidth
            margin="dense"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 999, py: 1.1 }}
          >
            Se connecter
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AdminLoginPage;
