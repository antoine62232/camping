import React from 'react';
import { Box, Typography, Button, Container, Grid, Stack, IconButton, Divider } from '@mui/material';
import '../App.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// IMPORT DES COMPOSANTS
import AnimationCard from '../components/AnimationCard';
import ActuCard from '../components/ActuCard';

// IMPORT DES DONNÉES JSON
import animationsData from '../animations.json';
import actusData from '../actus.json';

export default function ActuPage() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#fff', pb: 8, m: 0, p: 0 }}>
      
      {/* 1. HERO HEADER */}
      <Box 
        sx={{ 
          height: '400px',
          width: '100vw',
          maxWidth: '100%',
          backgroundImage: "url('/assets/ActusHeader.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          mb: 4
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.4)' }} />
        <Typography 
          variant="h3" 
          sx={{ color: '#fff', fontWeight: 'bold', zIndex: 1, textAlign: 'center', px: 2, textTransform: 'uppercase', fontSize: 28 }}
        >
          NOS ANIMATIONS POUR LES PETITS ET LES GRANDS !
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            position: 'absolute', bottom: '-12px', zIndex: 2,
            bgcolor: '#2E8857', color: '#fff', width: '209px', height: '25px', 
            padding: 0, minHeight: 0, fontSize: '12px', borderRadius: '20px', fontWeight: 'bold',
            '&:hover': { bgcolor: '#256f46' }
          }}
        >
          NOS ACTIVITÉS
        </Button>
      </Box>

      {/* CONTENEUR PRINCIPAL CENTRÉ */}
      <Container maxWidth="xl" disableGutters sx={{ mt: 6, p: 0 }}>
        
        {/* 2. SECTION ANIMATIONS */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
          {animationsData.map((anim) => (
            <Grid item xs={12} sm={6} md={4} key={anim.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <AnimationCard 
                title={anim.title} 
                desc={anim.desc} 
                image={anim.image} 
              />
            </Grid>
          ))}
        </Grid>

        {/* 3. BOUTON BROCHURE */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <Button 
            variant="contained" 
            sx={{ bgcolor: '#2E8857', color: '#fff', width: '209px', height: '25px', padding: 0, minHeight: 0, borderRadius: '20px', fontWeight: 'medium', fontSize: '12px', '&:hover': { bgcolor: '#256f46' }}}
          >
            NOTRE BROCHURE
          </Button>
        </Box>

        {/* 4. SECTION ACTU ET BLOG */}
        {/* Box englobante pour centrer le bloc*/}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box sx={{ 
            p: 4,
            
            borderRadius: '20px', 
            border: '1px solid #D3D3D3',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            width: '1050px',
            maxWidth: '95%',
            height: 'auto', 
          }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontFamily: 'Montserrat, sans-serif', fontSize: '28px' }}>
              ACTU ET BLOG
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {actusData.map((actu) => (
                <Grid item xs={12} md={6} lg={6} key={actu.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ActuCard 
                    title={actu.title} 
                    text={actu.text} 
                    image={actu.img} 
                    date={actu.date}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

      </Container>
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
}