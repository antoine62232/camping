import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import logo from "../assets/Logo_NavBar.png";
import { Link, useNavigate } from "react-router-dom";

// Largeur du menu latéral (Drawer)
const drawerWidth = 230.33;

// Les couleurs (Charte Graphique)
const themeColors = {
  primary: "#2E8857", // Vert Forêt
  background: "#F5F5DC", // Beige Sable
  text: "#333333",
};

const menuItems = [
  { text: "Réservations", path: "/reservation" },
  { text: "Actualités &\nÉvénements", path: "/actus" },
  { text: "Galerie", path: "/gallery" },
  { text: "Contact", path: "/contact" },
];

export default function Navbar({ children }) {
  const [open, setOpen] = useState(false); // Fermé par défaut
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("client");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        console.error("Client parse error", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("client");
    localStorage.removeItem("clientToken");
    setUser(null);
    navigate("/");
  };

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  // Contenu du menu (Logo + Liens)
  const drawerContent = (
    <Box
      sx={{
        bgcolor: themeColors.background,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Liste des pages */}
      <List
        sx={{
          width: "100%",
          height: "400px",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              width: "100%",
              justifyContent: "center",
              height: "100px",
              maxHeight: "100px",
              border: "1px solid #D3D3D3",
            }}
          >
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                "&:hover": {
                  color: themeColors.primary,
                  bgcolor: "transparent",
                },
                justifyContent: "center",
                width: "80%",
                height: "100%",
              }}
            >
              <ListItemText
                primary={item.text}
                sx={{ flex: "none" }}
                primaryTypographyProps={{
                  fontWeight: "medium",
                  fontSize: "22px",
                  textAlign: "center",
                  style: { whiteSpace: "pre-line" },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Bouton "Mon Compte" en bas */}
      <List sx={{ width: "100%", mt: "70px", mb: "70px" }}>
        {!user ? (
          // Pas connecté : lien vers /auth
          <ListItem disablePadding sx={{ justifyContent: "center" }}>
            <ListItemButton
              component={Link}
              to="/auth"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <ListItemIcon sx={{ color: "black", minWidth: 0 }}>
                <PersonOutlineOutlinedIcon sx={{ width: 30, height: 30 }} />
              </ListItemIcon>
              <ListItemText
                primary="Mon Compte"
                primaryTypographyProps={{
                  fontSize: "22px",
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          </ListItem>
        ) : (
          // Connecté : avatar + profil + déconnexion
          <>
            <ListItem disablePadding sx={{ justifyContent: "center", mb: 1 }}>
              <ListItemButton
                component={Link}
                to="/profil"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "#2E8B57",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                    fontWeight: "bold",
                  }}
                >
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </Box>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary="Voir le profil"
                  primaryTypographyProps={{
                    fontSize: "18px",
                    fontWeight: "medium",
                  }}
                  secondaryTypographyProps={{
                    fontSize: "14px",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ justifyContent: "center" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                sx={{ borderRadius: 999, px: 3, textTransform: "none" }}
              >
                Déconnexion
              </Button>
            </ListItem>
          </>
        )}
      </List>

      {/* ESPACE LOGO */}
      {/* FAUSSE BORDURE DU HAUT (Ligne de 130px) */}
      <Box sx={{ width: "130px", borderTop: "1px solid #D3D3D3", mb: 4 }} />
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pb: 4,
          minHeight: "200px",
          paddingTop: "300px",
          paddingBottom: "300px",
        }}
      >
        {/* Logo Cliquable */}
        <Link
          to="/"
          style={{
            display: "block",
            textDecoration: "none",
            width: "260px",
            height: "250px",
            borderRadius: "50%",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo Beauvert"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </Link>
      </Box>
      {/* FAUSSE BORDURE DU BAS (Ligne de 130px) */}
      <Box sx={{ width: "130px", borderTop: "1px solid #D3D3D3", mt: 4 }} />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* --- ZONE DE DÉTECTION (Bande invisible à gauche) --- */}
      <Box
        onMouseEnter={handleMouseEnter} // Ouvre le menu au survol
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: "20px", // Largeur de la zone sensible
          zIndex: 1300, // Au-dessus du reste
          bgcolor: "transparent", // Invisible
        }}
      />

      {/* BARRE DU HAUT (Visible seulement sur Mobile) */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ display: { sm: "none" }, bgcolor: themeColors.primary }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Camping Beauvert
          </Typography>
        </Toolbar>
      </AppBar>

      {/* --- LE DRAWER (Menu Latéral) --- */}
      <Drawer
        variant="temporary" // Temporaire pour permettre l'ouverture/fermeture
        open={open}
        onClose={handleDrawerClose}
        onMouseLeave={handleMouseLeave} // Ferme quand la souris sort
        // Rend le fond transparent (on voit le site derrière)
        ModalProps={{
          keepMounted: true,
          BackdropProps: { invisible: true },
        }}
        sx={{
          display: "block", // Toujours actif (mais caché si open=false)
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "none",
            bgcolor: themeColors.background,
            // Masquer la scrollbar
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* CONTENU PRINCIPAL */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: "100%",
          bgcolor: "#fff",
          minHeight: "100vh",
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }} />

        {/* C'est ici que s'affichera le reste du site */}
        {children}
      </Box>
    </Box>
  );
}
