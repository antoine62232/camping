import { useState } from "react";
import { Box, Container, Typography, Grid, TextField, Button, Paper, Stack, useTheme, Divider, Accordion, AccordionSummary, AccordionDetails, IconButton } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logoCamping from "../assets/Logo_NavBar.png";

const Contact = () => {
    const theme = useTheme();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
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

    const faqData = [
        {
            question: "Les animaux de compagnie sont-ils acceptés ?",
            answer: "Oui, les animaux sont les bienvenus au Camping Beauvert moyennant un supplément de 5€/jour. Ils doivent être tenus en laisse dans l'enceinte du camping."
        },
        {
            question: "À quelle heure pouvons-nous arriver ?",
            answer: "Les arrivées pour les emplacements se font à partir de 14h00. Pour les locations (Mobil-homes, Chalets), la remise des clés s'effectue à partir de 16h00."
        },
        {
            question: "La piscine est-elle chauffée ?",
            answer: "Tout à fait ! Notre espace aquatique est chauffé à 28°C d'avril à septembre, quelle que soit la météo extérieure."
        },
        {
            question: "Proposez-vous une assurance annulation ?",
            answer: "Oui, lors de votre réservation, vous pouvez souscrire à notre assurance 'Campez Couvert' qui vous protège en cas d'imprévu (maladie, panne, etc.)."
        }
    ];

    return (
         <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#fff', pb: 8, m: 0, p: 0 }}>

            {/* header */}
            <Box sx={{
                height: '400px',
                    width: '100%',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=80")',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    mb: 4
            }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.4)', borderRadius: { xs: 0, md: 4 } }} />
                <Typography variant="h2" color="white" sx={{ position: 'relative', zIndex: 1, textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center', px: 2 }}>
                    Contactez-nous
                </Typography>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 8 }}>
                <Grid container spacing={4} alignItems="flex-start">

                    {/* Coordonnées */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: theme.palette.section.main, height: '100%' }}>
                            <Typography variant="h5" color="primary.main" gutterBottom fontWeight="bold" mb={3}>
                                Nos Coordonnées
                            </Typography>

                            <Stack spacing={4}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <LocationOnIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">Adresse</Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Camping Beauvert<br />
                                            123 allée des Beaux Verres<br />
                                            64200 Biarritz, France
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <PhoneIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">Téléphone</Typography>
                                        <Typography variant="body1" color="text.secondary">05 59 00 00 00</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <EmailIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">Email</Typography>
                                        <Typography variant="body1" color="text.secondary">contact@camping-beauvert.fr</Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ borderColor: '#d3d3d3' }} />

                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <AccessTimeIcon color="primary" sx={{ fontSize: 30 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">Horaires Réception</Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Lun - Dim : 9h00 - 19h00
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Formulaire */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper elevation={3} sx={{ p: 5, borderRadius: 4, bgcolor: "white" }}>
                            <Typography variant="h5" color="primary.main" gutterBottom fontWeight="bold" mb={1}>
                                Envoyez-nous un message
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={4}>
                                Une question sur votre réservation ou nos services ? Remplissez ce formulaire.
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField fullWidth label="Votre Nom" name="name" variant="outlined" value={formData.name} onChange={handleChange} required />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField fullWidth label="Votre Email" name="email" type="email" variant="outlined" value={formData.email} onChange={handleChange} required />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField fullWidth label="Sujet" name="subject" variant="outlined" value={formData.subject} onChange={handleChange} required />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField fullWidth label="Votre Message" name="message" multiline rows={6} variant="outlined" value={formData.message} onChange={handleChange} required />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Button type="submit" variant="contained" size="large" endIcon={<SendIcon />} sx={{ bgcolor: theme.palette.primary.main, color: 'white', fontWeight: 'bold', py: 1.5, px: 4, '&:hover': { bgcolor: '#236b45' } }}>
                                            Envoyer le message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>

                </Grid>

                {/* FAQ */}
                <Box sx={{ mt: 10 }}>
                    <Typography variant="h4" textAlign="center" fontWeight="bold" color="primary.main" mb={5} textTransform="uppercase">
                        Questions Fréquentes
                    </Typography>
                    
                    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                        {faqData.map((item, index) => (
                            <Accordion key={index} elevation={0} sx={{ 
                                mb: 2, 
                                border: '1px solid #e0e0e0', 
                                borderRadius: '8px !important',
                                overflow: 'hidden'
                            }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}>
                                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#333' }}>
                                        {item.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
                                    <Typography color="text.secondary">
                                        {item.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
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
                        <IconButton ><FacebookIcon sx={{ fontSize: 30, color: "#333" }} /></IconButton>
                        <IconButton color="inherit"><InstagramIcon sx={{ fontSize: 30, color: "#333" }} /></IconButton>
                        <IconButton color="inherit"><LinkedInIcon sx={{ fontSize: 30, color: "#333" }} /></IconButton>
                    </Stack>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 5, opacity: 0.8 }}>
                        <Divider sx={{ width: { xs: "30px", md: "100px" }, bgcolor: "#ccc" }} />
                        <Typography variant="body2" color="text.primary" sx={{ mx: 2, textAlign: "center", fontWeight: 500 }}>
                            © 2025 BEAUVERT Projet Dev – Tous droits réservés.
                        </Typography>
                        <Divider sx={{ width: { xs: "30px", md: "100px" }, bgcolor: "#ccc" }} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                            component="img"
                            src={logoCamping}
                            alt="Logo Beauvert"
                            sx={{ height: 80, width: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Contact;