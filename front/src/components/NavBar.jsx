import React, { useState } from 'react';
import {
  Box, Drawer, CssBaseline, AppBar, Toolbar, List,
  Typography, Divider, IconButton, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import logo from '../assets/Logo_NavBar.png'

// Largeur du menu latéral (Drawer)
const drawerWidth = 230.33;

// Vos couleurs (Charte Graphique)
const themeColors = {
  primary: '#2E8857', // Vert Forêt
  background: '#F5F5DC', // Beige Sable
  text: '#333333'
};

const menuItems = [
  { text: 'Réservations' },
  { text: 'Actualités &\nÉvénements' },
  { text: 'Galerie' },
  { text: 'Contact' },
];

export default function Navbar({ children }) {
  const [open, setOpen] = useState(false); // État pour le mobile

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // Contenu du Drawer (Logo + Liens)
  const drawerContent = (
    <Box sx={{ bgcolor: themeColors.background, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


      <List
        sx={{
          width: '100%',
          height: '400px', // 1. Hauteur fixée à 400px
          minHeight: '400px',
          display: 'flex', // Active Flexbox
          flexDirection: 'column', // Les éléments sont les uns sous les autres
          alignItems: 'center', // Centre les éléments horizontalement dans la liste
          paddingTop: 0,
          paddingBottom: 0
        }}
      >
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ width: '100%', justifyContent: 'center', height: '100px', maxHeight: '100px', border: '1px solid #D3D3D3' }}>
            <ListItemButton
              sx={{
                '&:hover': { color: themeColors.primary, bgcolor: 'transparent' }, // Supprime le fond gris au survol si désiré
                justifyContent: 'center', // 3. Centre le contenu (Icône + Texte) horizontalement
                width: '80%', // (Optionnel) Réduit la zone cliquable pour faire plus "bouton"

              }}
            >

              {/* flex: 'none' empêche le texte de pousser l'icône sur le côté */}
              <ListItemText
                primary={
                  item.text === 'Actualités & Événements' ? (
                    <>
                      Actualités &amp; <br /> Événements
                    </>
                  ) : (
                    item.text
                  )
                }
                sx={{ flex: 'none' }}
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  fontSize: '22px',
                  textAlign: 'center',
                  style: { whiteSpace: 'pre-line' }
                }}
              />

            </ListItemButton>
          </ListItem>
        ))}
      </List>


      {/* Bouton "Mon Compte" en bas */}
      <List sx={{ width: '100%', mt: '70px', mb: '70px' }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <ListItemIcon sx={{ color: 'black', minWidth: 0 }}><PersonOutlineOutlinedIcon sx={{ width: 30, height: 30 }} /></ListItemIcon>
            <ListItemText primary="Mon Compte"
              primaryTypographyProps={{
                fontSize: '22px'
              }} />
          </ListItemButton>
        </ListItem>
      </List>
      {/* ESPACE LOGO (Cadre Violet de 600px) */}
      {/* ESPACE LOGO (Prend tout l'espace restant) */}
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pb: 4,
          minHeight: '200px',
          paddingTop: '175px',
          paddingBottom: '175px'
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo Beauvert"
          sx={{
            width: 260,
            height: 250,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* BARRE DU HAUT (Visible seulement sur Mobile) */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          display: { sm: 'none' },
          bgcolor: themeColors.primary,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Camping Beauvert
          </Typography>
        </Toolbar>
      </AppBar>

      {/* DRAWER (Menu Latéral) */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Version Mobile (Temporaire) */}
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Version Desktop (Permanent) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', bgcolor: themeColors.background },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* CONTENU PRINCIPAL (Poussé par le menu) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#fff', // Fond blanc pour le contenu
          minHeight: '100vh'
        }}
      >
        <Toolbar sx={{ display: { sm: 'none' } }} /> {/* Espace pour la navbar mobile */}

        {/* C'est ici que s'affichera le reste de votre site */}
        {children}

      </Box>
    </Box>
  );
}