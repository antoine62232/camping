import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Rating, Divider, Stack, Container, ButtonGroup, Button, Grid, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WifiIcon from '@mui/icons-material/Wifi';
import BedIcon from '@mui/icons-material/Bed';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import logoCamping from '../assets/Logo_NavBar.png';

// 2. IMPORT DU SERVICE (Qui utilise Axios)
import { getAllAccommodations } from "../services/accommodationService";

const Homepage = () => {
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [activeFilter, setActiveFilter] = useState('chambres');

    // --- CONNEXION AU BACK-END ---
    useEffect(() => {
        getAllAccommodations()
            .then((response) => {
                const api = response.data;
                console.log("Données reçues via Axios :", api);

                // Mapping des données (SQL -> Front)
                const formattedData = api.map((item) => ({
                    id: item.idAccommodation,

                    title: item.typeAccommodation || "Hébergement",
                    location: item.descriptionAccommodation || "Camping Beauvert",
                    rating: 4.5, // Valeur par défaut
                    reviews: 24, // Valeur par défaut
                    price: item.basePriceAccommodation || 0,
                    // Image par défaut
                    img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80"
                }));

                setResults(formattedData);
            })
            .catch((error) => {
                console.error("Erreur Axios :", error);
            });
    }, []);

    //bouton de tri
    const sortingByBedroom = () => setActiveFilter('chambres');
    const sortingByPrice = () => {
        const sorted = [...results].sort((a, b) => a.price - b.price);
        setResults(sorted);
        setActiveFilter('prix');
    };
    const sortingByRating = () => {
        const sorted = [...results].sort((a, b) => b.rating - a.rating);
        setResults(sorted);
        setActiveFilter('avis');
    };

    const sliderSettings = {
        dots: false,
        infinite: results.length > 1,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box sx={{ bgcolor: "#f9f9f9" }}>

            {/* header */}
            <Box
                sx={{
                    height: '60vh',
                    width: '100%',
                    backgroundImage: 'url("https://www.camping-news.net/wp-content/uploads/2025/03/110320251741717473.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    mb: 8
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.3)' }} />
                <Typography variant="h3" component="h1" color="white" fontWeight="bold" textAlign="center" sx={{ position: 'relative', zIndex: 1, textTransform: 'uppercase', px: 2 }}>
                    Bienvenue au camping Beauvert !
                </Typography>
            </Box>

            <Container sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" textTransform="uppercase" gutterBottom>
                    Laissez-nous vous surprendre !
                </Typography>
            </Container>

            {/* Slides */}
            {results.length > 0 ? (
                <Box sx={{ width: "50%", margin: "0 auto", mb: 8 }}>
                    <Slider {...sliderSettings}>
                        {results.slice(0, 5).map((slide) => (
                            <Box key={slide.id} sx={{ p: 2 }}>
                                <Paper elevation={0} sx={{ display: "flex", borderRadius: 3, overflow: "hidden", height: 350, bgcolor: "primary.main", boxShadow: 'customSoft' }}>
                                    <Box component="img" src={slide.img} alt={slide.title} sx={{ width: "40%", objectFit: "cover" }} />
                                    <Box sx={{ width: "60%", p: 3, pl: 4, color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <Box>
                                            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>{slide.title}</Typography>
                                            <Typography variant="body1" sx={{ opacity: 0.9 }}>{slide.location}</Typography>
                                            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                                <Rating value={Number(slide.rating)} precision={0.5} readOnly size="small" sx={{ color: "#FFD700" }} />
                                                <Typography variant="body2" sx={{ ml: 1, color: "white", opacity: 0.9 }}>{slide.reviews} avis</Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <Typography variant="body1">Dates disponibles</Typography>
                                                    <CalendarTodayIcon fontSize="small" />
                                                </Box>
                                                <Typography variant="h4" fontWeight="bold">A partir de {slide.price}€</Typography>
                                            </Box>
                                            <Divider sx={{ bgcolor: "white", mt: 1, mb: 2, opacity: 0.6 }} />
                                            <Stack direction="row" spacing={3}><BedIcon /><LocalCafeIcon /><WifiIcon /></Stack>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            ) : (
                <Typography textAlign="center" sx={{ mb: 5, color: 'gray' }}>Chargement des offres...</Typography>
            )}

            {/* Boutons Tri */}
            <Container sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                    Recherchez votre hebergement
                </Typography>
            </Container>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
                <ButtonGroup variant="outlined" sx={{ bgcolor: 'white', '& .MuiButton-root': { borderColor: '#2E8B57', color: '#2E8B57', px: 4, py: 1.5 } }}>
                    <Button onClick={sortingByBedroom} sx={activeFilter === 'chambres' ? { bgcolor: '#2E8B57 !important', color: 'white !important' } : {}}>Par chambres</Button>
                    <Button onClick={sortingByPrice} sx={activeFilter === 'prix' ? { bgcolor: '#2E8B57 !important', color: 'white !important' } : {}}>Par prix</Button>
                    <Button onClick={sortingByRating} sx={activeFilter === 'avis' ? { bgcolor: '#2E8B57 !important', color: 'white !important' } : {}}>Par avis</Button>
                </ButtonGroup>
            </Box>

            {/* Cards Grid */}
            <Container sx={{ mb: 10 }}>
                <Grid container spacing={4} justifyContent="center">
                    {results.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: "0 2px 10px rgba(0,0,0,0.08)", transition: "0.3s ease", '&:hover': { transform: "translateY(-5px)", boxShadow: "0 12px 24px rgba(0,0,0,0.2)" } }}>
                                <CardMedia component="img" height="200" image={item.img} alt={item.title} />
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>{item.title}</Typography>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">{item.location}</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <Rating value={Number(item.rating)} precision={0.5} readOnly size="small" />
                                            <Typography variant="caption" sx={{ ml: 0.5 }}>({item.reviews})</Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 1 }} />
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                        <Typography variant="h6" color="#548C5C" fontWeight="bold">
                                            {item.price}€ <Typography component="span" variant="body2" color="text.secondary">/ nuit</Typography>
                                        </Typography>
                                        <Button variant="contained" size="small" sx={{ bgcolor: "#548C5C" }} onClick={() => navigate(`/reservation/${item.id}`)}>
                                            Réserver
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Box component="footer" sx={{ bgcolor: '#FDFBF7', py: 6, borderTop: '1px solid #eaeaea' }}>
                <Container maxWidth="lg">
                    <Stack direction="row" spacing={3} justifyContent="center" mb={5}>
                        <IconButton color="inherit"><FacebookIcon sx={{ fontSize: 30, color: '#333' }} /></IconButton>
                        <IconButton color="inherit"><InstagramIcon sx={{ fontSize: 30, color: '#333' }} /></IconButton>
                        <IconButton color="inherit"><LinkedInIcon sx={{ fontSize: 30, color: '#333' }} /></IconButton>
                    </Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 5, opacity: 0.8 }}>
                        <Divider sx={{ width: { xs: '30px', md: '100px' }, bgcolor: '#ccc' }} />
                        <Typography variant="body2" color="text.primary" sx={{ mx: 2, textAlign: 'center', fontWeight: 500 }}>
                            © 2025 BEAUVERT Projet Dev – Tous droits réservés.
                        </Typography>
                        <Divider sx={{ width: { xs: '30px', md: '100px' }, bgcolor: '#ccc' }} />
                    </Box>

                    {/* Logo Footer */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            component="img"
                            src={logoCamping}
                            alt="Logo Beauvert"
                            sx={{ height: 80, width: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default Homepage;