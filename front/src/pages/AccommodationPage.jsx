import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Grid, Paper, Button, Chip, Divider, Stack, CircularProgress, Alert } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AcUnitIcon from '@mui/icons-material/AcUnit'; 
import { getAccommodationById } from "../services/accommodationService";

const AccommodationPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAccommodationById(id)
            .then((response) => {
                const rawData = response.data;
                console.log("Données reçues (Détail) :", rawData);

                // Si le back renvoie un tableau, on prend le premier élément. Sinon l'objet direct.
                const item = Array.isArray(rawData) ? rawData[0] : rawData;

                if (item) {
                    setAccommodation({
                        // --- MAPPING SQL -> FRONT ---
                        id: item.idAccommodation,
                        title: item.typeAccommodation || "Hébergement sans nom",
                        price: item.basePriceAccommodation || 0,
                        surface: item.surfaceAccommodation || 0,
                        capacity: item.abilityAccommodation || 2,
                        // Transforme la chaine "Wifi,TV" en tableau ["Wifi", "TV"]
                        equipments: item.equipementAccommodation ? item.equipementAccommodation.split(',') : [],
                        img: item.imageAccommodation || "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80"
                    });
                } else {
                    setError("Hébergement introuvable.");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur chargement détail :", err);
                setError("Impossible de charger les détails.");
                setLoading(false);
            });
    }, [id]);

    // Gestion des états (Chargement / Erreur)
    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress sx={{ color: '#2E8B57' }} />
        </Box>
    );

    if (error) return (
        <Container sx={{ mt: 10 }}>
            <Alert severity="error">{error}</Alert>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
                Retour
            </Button>
        </Container>
    );

    if (!accommodation) return null;

    return (
        <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: 4 }}>
            <Container maxWidth="lg">
                
                {/* Bouton Retour */}
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => navigate('/')}
                    sx={{ mb: 3, color: '#555', textTransform: 'none', fontWeight: 'bold' }}
                >
                    Retour aux offres
                </Button>

                <Grid container spacing={4}>
                    
                    {/* GAUCHE : IMAGE */}
                    <Grid item xs={12} md={7}>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                borderRadius: 4, 
                                overflow: 'hidden', 
                                height: { xs: 300, md: 500 },
                                position: 'relative'
                            }}
                        >
                            <Box 
                                component="img" 
                                src={accommodation.img} 
                                alt={accommodation.title}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Paper>
                    </Grid>

                    {/* DROITE : DETAILS */}
                    <Grid item xs={12} md={5}>
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            
                            <Typography variant="h4" fontWeight="bold" color="#2E8B57" gutterBottom>
                                {accommodation.title}
                            </Typography>
                            
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.8 }}>
                                {accommodation.description}
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            {/* Infos techniques */}
                            <Stack direction="row" spacing={4} mb={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PeopleIcon color="action" />
                                    <Typography fontWeight="bold">{accommodation.capacity} Pers.</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <SquareFootIcon color="action" />
                                    <Typography fontWeight="bold">{accommodation.surface} m²</Typography>
                                </Box>
                            </Stack>

                            {/* Équipements */}
                            <Typography variant="h6" gutterBottom sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                Équipements inclus :
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 'auto' }}>
                                {accommodation.equipments.length > 0 ? (
                                    accommodation.equipments.map((eq, index) => (
                                        <Chip 
                                            key={index} 
                                            label={eq.trim()} 
                                            icon={<AcUnitIcon style={{fontSize: 16}} />} 
                                            size="small" 
                                            sx={{ bgcolor: '#e8f5e9', color: '#2E8B57' }}
                                        />
                                    ))
                                ) : (
                                    <Chip label="Tout équipé" size="small" />
                                )}
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* PRIX */}
                            <Box sx={{ bgcolor: '#f1f8f3', p: 3, borderRadius: 3, textAlign: 'center' }}>
                                <Typography variant="caption" color="text.secondary" textTransform="uppercase" fontWeight="bold">
                                    Prix par nuit
                                </Typography>
                                <Typography variant="h3" fontWeight="bold" color="#2E8B57" sx={{ mb: 2 }}>
                                    {accommodation.price}€
                                </Typography>
                                
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large"
                                    sx={{ 
                                        bgcolor: "#2E8B57", 
                                        fontWeight: 'bold', 
                                        py: 1.5,
                                        '&:hover': { bgcolor: "#236b45" }
                                    }}
                                    onClick={() => alert("Le système de réservation sera bientôt disponible !")}
                                >
                                    Réserver maintenant
                                </Button>
                            </Box>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AccommodationPage;