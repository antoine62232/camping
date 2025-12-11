import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";

const Contact = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", formData);
    alert("Merci ! Votre message a bien été envoyé.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Box
      sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 8, pt: 12 }}
    >
      {/* header */}
      <Box
        sx={{
          height: "40vh",
          width: { xs: "100%", md: "auto" },
          backgroundImage:
            'url("https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          mb: 6,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.4)",
            borderRadius: { xs: 0, md: 4 },
          }}
        />
        <Typography
          variant="h2"
          color="white"
          sx={{
            position: "relative",
            zIndex: 1,
            textTransform: "uppercase",
            fontWeight: "bold",
            textAlign: "center",
            px: 2,
          }}
        >
          Contactez-nous
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* coordonnées */}
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: theme.palette.section.main,
                height: "100%",
              }}
            >
              <Typography
                variant="h5"
                color="primary.main"
                gutterBottom
                fontWeight="bold"
                mb={3}
              >
                Nos Coordonnées
              </Typography>

              <Stack spacing={4}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <LocationOnIcon color="primary" sx={{ fontSize: 30 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Adresse
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Camping Beauvert
                      <br />
                      123 allée des Beaux Verres
                      <br />
                      64200 Biarritz, France
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <PhoneIcon color="primary" sx={{ fontSize: 30 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Téléphone
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      05 59 00 00 00
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <EmailIcon color="primary" sx={{ fontSize: 30 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Email
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      contact@camping-beauvert.fr
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: "#d3d3d3" }} />

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <AccessTimeIcon color="primary" sx={{ fontSize: 30 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Horaires Réception
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Lun - Dim : 9h00 - 19h00
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* formulaire */}
          <Grid size={{ xs: 12, sm: 7, md: 8 }}>
            <Paper
              elevation={3}
              sx={{ p: 5, borderRadius: 4, bgcolor: "white" }}
            >
              <Typography
                variant="h5"
                color="primary.main"
                gutterBottom
                fontWeight="bold"
                mb={1}
              >
                Envoyez-nous un message
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Une question sur votre réservation ou nos services ? Remplissez
                ce formulaire.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Votre Nom"
                      name="name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Votre Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Sujet"
                      name="subject"
                      variant="outlined"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Votre Message"
                      name="message"
                      multiline
                      rows={6}
                      variant="outlined"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: "white",
                        fontWeight: "bold",
                        py: 1.5,
                        px: 4,
                        "&:hover": { bgcolor: "#236b45" },
                      }}
                    >
                      Envoyer le message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
