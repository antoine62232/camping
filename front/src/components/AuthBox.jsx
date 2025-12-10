import { useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Stack,
  Grid,
  Link,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { useFormik } from "formik";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import {
  registerUser,
  loginUser,
  resetPassword,
} from "../services/usersService";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function AuthBox() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [registerStep, setRegisterStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(0);

  const isRegister = tab === 0;
  const isLogin = tab === 1;
  const handleGoAdmin = () => {
    navigate("/admin/login");
  };

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      dateOfBirth: "",
      streetNumber: "",
      streetName: "",
      postalCode: "",
      city: "",
      adressComplement: "",
      email: "",
      password: "",
      phoneNumber: "",
      newsletter: false,
    },
    validationSchema: isRegister ? registerSchema : loginSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isRegister) {
          if (registerStep < 3) {
            setRegisterStep((s) => s + 1);
            return;
          }

          await registerUser({
            lastNameUser: values.lastName,
            firstNameUser: values.firstName,
            dateOfBirth: values.dateOfBirth,
            streetNumberUser: values.streetNumber,
            streetNameUser: values.streetName,
            postalCodeUser: values.postalCode,
            cityUser: values.city,
            adressComplementUser: values.adressComplement || null,
            emailUser: values.email,
            passwordUser: values.password,
            phoneNumberUser: values.phoneNumber,
          });

          setRegisterStep(4);
          return;
        }

        if (isLogin && forgotStep === 1) {
          await resetPassword({
            emailUser: values.email, 
            newPassword: values.password,
          });
          setForgotStep(2);
          return;
        }

        const data = await loginUser({
          emailUser: values.email,
          passwordUser: values.password,
        });
        localStorage.setItem("clientToken", data.token);
        resetForm();
        navigate("/");
      } catch (err) {
        console.error("LOGIN/REGISTER ERROR:", err);
      }
    },
  });

  const f = formik;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 420,
          maxWidth: "100%",
          px: 3,
          py: 2.5,
          borderRadius: 3,
          position: "relative",
          bgcolor: "section.main",
          boxShadow: (theme) => theme.shadows.customSoft,
        }}
      >
        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
          <Tooltip title="Espace admin">
            <IconButton
              size="small"
              onClick={handleGoAdmin}
              aria-label="Espace admin"
            >
              <span role="img" aria-hidden="true">
                ⚙️
              </span>
            </IconButton>
          </Tooltip>
        </Box>
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v);
            setRegisterStep(1);
          }}
          textColor="primary"
          sx={{
            mb: 2,
            "& .MuiTabs-indicator": {
              backgroundColor: "#2E8B57",
            },
          }}
        >
          <Tab
            label="S’enregistrer"
            sx={{ textTransform: "none", fontWeight: tab === 0 ? 700 : 500 }}
          />
          <Tab
            label="Se connecter"
            sx={{ textTransform: "none", fontWeight: tab === 1 ? 700 : 500 }}
          />
        </Tabs>

        <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
          <Button
            size="small"
            variant="contained"
            sx={{
              minWidth: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#000",
            }}
          >
            
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              minWidth: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#3b5998",
            }}
          >
            f
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              minWidth: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#db4437",
            }}
          >
            G
          </Button>
        </Stack>

        <Typography
          align="center"
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          ou s’enregistrer avec un email
        </Typography>

        <Box component="form" onSubmit={f.handleSubmit} noValidate>
          {isLogin && forgotStep === 0 && (
            <>
              <TextField
                margin="dense"
                fullWidth
                label="Adresse email"
                name="email"
                type="email"
                size="small"
                value={f.values.email}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.email && Boolean(f.errors.email)}
                helperText={f.touched.email && f.errors.email}
              />

              <TextField
                margin="dense"
                fullWidth
                label="Mot de passe"
                name="password"
                size="small"
                type={showPassword ? "text" : "password"}
                value={f.values.password}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.password && Boolean(f.errors.password)}
                helperText={f.touched.password && f.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  mb: 2,
                  color: "#2E8B57",
                  fontSize: 13,
                  cursor: "pointer",
                }}
                onClick={() => setForgotStep(1)}
              >
                Mot de passe oublié ? Cliquez ici
              </Typography>
            </>
          )}

          {isRegister && registerStep === 1 && (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Informations personnelles{" "}
                <span style={{ color: "#2E8B57" }}>2 sur 3</span>
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Prénom"
                    name="firstName"
                    size="small"
                    value={f.values.firstName}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    error={f.touched.firstName && Boolean(f.errors.firstName)}
                    helperText={f.touched.firstName && f.errors.firstName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Nom de famille"
                    name="lastName"
                    size="small"
                    value={f.values.lastName}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    error={f.touched.lastName && Boolean(f.errors.lastName)}
                    helperText={f.touched.lastName && f.errors.lastName}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                margin="dense"
                label="Téléphone"
                name="phoneNumber"
                size="small"
                value={f.values.phoneNumber}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.phoneNumber && Boolean(f.errors.phoneNumber)}
                helperText={f.touched.phoneNumber && f.errors.phoneNumber}
              />

              <TextField
                fullWidth
                margin="dense"
                label="Anniversaire"
                name="dateOfBirth"
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
                value={f.values.dateOfBirth}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.dateOfBirth && Boolean(f.errors.dateOfBirth)}
                helperText={f.touched.dateOfBirth && f.errors.dateOfBirth}
              />

              <TextField
                margin="dense"
                fullWidth
                label="Adresse email"
                name="email"
                type="email"
                size="small"
                value={f.values.email}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.email && Boolean(f.errors.email)}
                helperText={f.touched.email && f.errors.email}
              />

              <TextField
                margin="dense"
                fullWidth
                label="Mot de passe"
                name="password"
                size="small"
                type={showPassword ? "text" : "password"}
                value={f.values.password}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.password && Boolean(f.errors.password)}
                helperText={
                  f.touched.password && f.errors.password
                    ? f.errors.password
                    : "8+ caractères"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {isLogin && forgotStep === 1 && (
            <>
              <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                <Tooltip title="Retour à la connexion">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setForgotStep(0);
                    }}
                    aria-label="Retour"
                  >
                    <ArrowBack fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Réinitialiser votre mot de passe
              </Typography>

              <TextField
                margin="dense"
                fullWidth
                label="Adresse email"
                name="email"
                type="email"
                size="small"
                value={f.values.email}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.email && Boolean(f.errors.email)}
                helperText={f.touched.email && f.errors.email}
              />

              <TextField
                margin="dense"
                fullWidth
                label="Nouveau mot de passe"
                name="password"
                size="small"
                type={showPassword ? "text" : "password"}
                value={f.values.password}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.password && Boolean(f.errors.password)}
                helperText={
                  f.touched.password && f.errors.password
                    ? f.errors.password
                    : "8+ caractères"
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {isLogin && forgotStep === 2 && (
            <Box textAlign="center" sx={{ py: 4 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 160,
                  bgcolor: "primary.main",
                  borderRadius: 3,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "textondark.default",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Mot de passe réinitialisé
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Vous pouvez maintenant vous reconnecter avec votre nouveau mot
                de passe.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setForgotStep(0);
                  f.resetForm();
                }}
              >
                Retour à la connexion
              </Button>
            </Box>
          )}

          {isRegister && registerStep === 2 && (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Ajouter une adresse{" "}
                <span style={{ color: "#2E8B57" }}>3 sur 3</span>
              </Typography>

              <TextField
                fullWidth
                margin="dense"
                label="Chercher une adresse"
                size="small"
              />

              <Typography variant="body2" sx={{ mt: 1, mb: 1, fontSize: 12 }}>
                Votre adresse n’est pas visible par les autres utilisateurs.
              </Typography>

              <Stack direction="row" spacing={1} mb={2}>
                <Button variant="outlined" color="primary" fullWidth>
                  Utiliser la géolocalisation
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => setRegisterStep(3)}
                >
                  Ajouter manuellement
                </Button>
              </Stack>
            </>
          )}

          {isRegister && registerStep === 3 && (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Ajouter une adresse{" "}
                <span style={{ color: "#2E8B57" }}>3 sur 3</span>
              </Typography>

              <TextField
                fullWidth
                margin="dense"
                label="Numéro de rue"
                name="streetNumber"
                size="small"
                value={f.values.streetNumber}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.streetNumber && Boolean(f.errors.streetNumber)}
                helperText={f.touched.streetNumber && f.errors.streetNumber}
              />

              <TextField
                fullWidth
                margin="dense"
                label="Nom de rue"
                name="streetName"
                size="small"
                value={f.values.streetName}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.streetName && Boolean(f.errors.streetName)}
                helperText={f.touched.streetName && f.errors.streetName}
              />

              <TextField
                fullWidth
                margin="dense"
                label="Appartement (optionnel)"
                name="adressComplement"
                size="small"
                value={f.values.adressComplement}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={
                  f.touched.adressComplement &&
                  Boolean(f.errors.adressComplement)
                }
                helperText={
                  f.touched.adressComplement && f.errors.adressComplement
                }
              />

              <TextField
                fullWidth
                margin="dense"
                label="Ville"
                name="city"
                size="small"
                value={f.values.city}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.city && Boolean(f.errors.city)}
                helperText={f.touched.city && f.errors.city}
              />

              <TextField
                fullWidth
                margin="dense"
                label="Code postal"
                name="postalCode"
                size="small"
                value={f.values.postalCode}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                error={f.touched.postalCode && Boolean(f.errors.postalCode)}
                helperText={f.touched.postalCode && f.errors.postalCode}
              />
            </>
          )}
          {isRegister && registerStep === 4 && (
            <Box textAlign="center" sx={{ py: 4 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 160,
                  bgcolor: "primary.main",
                  borderRadius: 3,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "textondark.default",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Inscription réussie !
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Votre inscription est maintenant réussie !
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Vous pouvez maintenant accéder au site et réserver votre séjour.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ borderRadius: 999, py: 1.1 }}
                onClick={() => {
                  f.resetForm();
                  setTab(1);
                  setRegisterStep(1);
                  navigate("/");
                }}
              >
                Aller sur le site
              </Button>
            </Box>
          )}

          {/* BOUTON PRINCIPAL */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 999, py: 1.1, mt: 2 }}
          >
            {isLogin
              ? forgotStep === 1
                ? "Mettre à jour le mot de passe"
                : "Se connecter"
              : registerStep < 3
              ? "Suivant"
              : "Sauvegarder les informations"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, fontSize: 12 }}
          >
            Espace employé ?{" "}
            <Link
              component={RouterLink}
              to="/admin/login"
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              Se connecter ici
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default AuthBox;
