import React, { useState } from 'react';
import { Box, Typography, Container, ButtonGroup, Button, Grid, Modal, Fade, Backdrop } from '@mui/material';
import { Stack, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CloseIcon from '@mui/icons-material/Close';

import galleryData from '../gallery.json'; 

const GalleryPage = () => {
    // État pour le filtre (par défaut 'all')
    const [activeFilter, setActiveFilter] = useState('all');
    
    // État pour la Lightbox (Plein écran)
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // --- LOGIQUE DE FILTRAGE ---
    const filterImages = () => {
        if (activeFilter === 'all') {
            return galleryData;
        }
        return galleryData.filter(item => item.category === activeFilter);
    };

    const filteredData = filterImages();

    // --- GESTION LIGHTBOX ---
    const handleOpen = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    return (
        <Box sx={{ pb: 8, bgcolor: '#fff', minHeight: '100vh' }}>
            {/* 1. HERO HEADER */}
            <Box
                sx={{
                    height: '400px',
                    width: '100%',
                    backgroundImage: "url('/assets/GalleryHeader.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    mb: 4
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.4)' }} />
                <Typography
                    variant="h2"
                    sx={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: 'Montserrat, sans-serif',
                        zIndex: 1,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontSize: { xs: '32px', md: '48px' },
                        mb: 2
                    }}
                >
                    IMMERSION BEAUVERT
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#F5F5DC',
                        zIndex: 1,
                        textAlign: 'center',
                        maxWidth: '800px',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'medium',
                        px: 2
                    }}
                >
                    Découvrez nos hébergements, notre espace aquatique et la nature environnante.
                </Typography>
            </Box>

            {/* 2. TITRE & FILTRES */}
            <Container sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold" textTransform="uppercase">
                    Galerie photos
                </Typography>
            </Container>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 6, flexWrap: 'wrap', gap: 2 }}>
                <ButtonGroup
                    variant="outlined"
                    sx={{
                        bgcolor: "white",
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        boxShadow: 'none',
                        border: 'none',
                        "& .MuiButton-root": {
                            borderColor: "#2E8B57",
                            color: "#2E8B57",
                            px: 3,
                            py: 1,
                            m: 0.5,
                            borderRadius: '20px !important',
                            border: '1px solid #2E8B57'
                        },
                    }}
                >
                    <Button
                        onClick={() => setActiveFilter('all')}
                        sx={activeFilter === "all" ? { bgcolor: "#2E8B57 !important", color: "white !important" } : {}}
                    >
                        Tous
                    </Button>
                    <Button
                        onClick={() => setActiveFilter('camping')}
                        sx={activeFilter === "camping" ? { bgcolor: "#2E8B57 !important", color: "white !important" } : {}}
                    >
                        Camping
                    </Button>
                    <Button
                        onClick={() => setActiveFilter('logements')}
                        sx={activeFilter === "logements" ? { bgcolor: "#2E8B57 !important", color: "white !important" } : {}}
                    >
                        Logements
                    </Button>
                    <Button
                        onClick={() => setActiveFilter('piscine')}
                        sx={activeFilter === "piscine" ? { bgcolor: "#2E8B57 !important", color: "white !important" } : {}}
                    >
                        Piscine
                    </Button>
                    <Button
                        onClick={() => setActiveFilter('tourisme')}
                        sx={activeFilter === "tourisme" ? { bgcolor: "#2E8B57 !important", color: "white !important" } : {}}
                    >
                        Tourisme
                    </Button>
                </ButtonGroup>
            </Box>

            {/* 3. GRILLE D'IMAGES */}
            <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
                <Grid container spacing={2} justifyContent="center">
                    {filteredData.map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            <Box
                                onClick={() => handleOpen(item)}
                                sx={{
                                    height: '250px',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                                    }
                                }}
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    loading="lazy"
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* 4. MODAL (LIGHTBOX) */}
            {/* Ce bloc est caché par défaut (open={false}). Il s'affiche par-dessus tout le reste quand open={true} */}
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.9)' } }}
            >
                {/* Fade : Animation d'apparition en douceur */}
                <Fade in={open}>
                    {/* La boîte qui contient l'image centrée */}
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        outline: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {/* Bouton Fermer */}
                        <CloseIcon
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: -40,
                                right: 0,
                                color: '#fff',
                                fontSize: 40,
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        />

                        {/* Image en grand format */}
                        {selectedImage && (
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '90vh',
                                    borderRadius: '8px',
                                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                }}
                            />
                        )}
                    </Box>
                </Fade>
            </Modal>
            {/* Footer */}
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

export default GalleryPage;