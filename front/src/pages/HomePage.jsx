import { Box, Typography, Paper, Rating, Divider, Stack, Container, ButtonGroup, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WifiIcon from '@mui/icons-material/Wifi';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BedIcon from '@mui/icons-material/Bed';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';


const slides = [
    {
        id: 1,
        title: "Hotel Beauvert 4 étoiles",
        location: "Hôtel de qualité en bord de plage sur Biarritz",
        rating: 4.5,
        reviews: 16,
        price: 172,
        img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Mobil Home Deluxe",
        location: "Vue imprenable sur la forêt des Landes",
        rating: 5,
        reviews: 42,
        price: 120,
        img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Mobil Home Deluxe",
        location: "Vue imprenable sur la forêt des Landes",
        rating: 5,
        reviews: 42,
        price: 120,
        img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80"
    },

];

const Homepage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return <>
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", my: 5 }}>
            <Typography variant="h2">
                LAISSEZ-NOUS VOUS SURPRENDRE !
            </Typography>
        </Container>

        <Box sx={{ width: "80%", margin: "50px auto" }}>
            <Slider {...settings}>
                {slides.map((slide) => (
                    <Box key={slide.id} sx={{ p: 2 }}>

                        {/* CONTENEUR PRINCIPAL (La Carte) */}
                        <Paper
                            elevation={4}
                            sx={{
                                display: "flex",
                                borderRadius: 4,
                                overflow: "hidden",
                                height: 350,
                                bgcolor: "#548C5C"
                            }}
                        >

                            {/* PARTIE GAUCHE : L'IMAGE (40%) */}
                            <Box
                                component="img"
                                src={slide.img}
                                alt={slide.title}
                                sx={{
                                    width: "40%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />

                            {/* PARTIE DROITE : LE CONTENU (60%) */}
                            <Box sx={{
                                width: "60%",
                                p: 4,
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}>

                                {/* Bloc Haut : Titre et Description */}
                                <Box>
                                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                                        {slide.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                                        {slide.location}
                                    </Typography>

                                    {/* Ligne Etoiles + Avis */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                        <Rating value={slide.rating} precision={0.5} readOnly sx={{ color: "#FFD700" }} />
                                        <Typography variant="body2">
                                            {slide.reviews} avis
                                        </Typography>
                                    </Box>

                                    {/* Ligne Calendrier */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography variant="body1">Dates disponibles</Typography>
                                        <CalendarTodayIcon fontSize="small" />
                                    </Box>
                                </Box>

                                {/* Bloc Bas : Prix et Icônes */}
                                <Box>
                                    {/* Prix */}
                                    <Typography variant="h4" align="right" fontWeight="bold">
                                        A partir de {slide.price}€
                                    </Typography>

                                    {/* La ligne de séparation */}
                                    <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }} />

                                    {/* icônes */}
                                    <Stack direction="row" spacing={3}>
                                        <BedIcon />
                                        <LocalCafeIcon />
                                        <KitchenIcon />
                                        <WifiIcon />
                                    </Stack>
                                </Box>

                            </Box>
                        </Paper>
                    </Box>
                ))}
            </Slider>
        </Box>


        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", my: 15 }}>
            <Typography variant="h2">
                RECHERCHEZ VOTRE HEBERGEMENT
            </Typography>
        </Container>

        <ButtonGroup variant="outlined" aria-label="Basic button group"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                my: 15
            }}>
            <Button>Par Chambres</Button>
            <Button>Par prix</Button>
            <Button>Par services</Button>
            <Button>Par avis</Button>
        </ButtonGroup>


    </>
}

export default Homepage;