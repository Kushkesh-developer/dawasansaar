import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    TextField,
    IconButton,
    Divider,
    Stack
} from "@mui/material";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Copyright
} from "lucide-react";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "#f5f5f5",
                py: 6,
                mt: 4,
                borderTop: "1px solid #e0e0e0"
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4} direction="row" alignItems="flex-start">
                    {/* Get In Touch Section */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" color="primary" fontWeight="600" gutterBottom>
                            Get In Touch
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 3 }}>
                            <MapPin size={20} color="#2E86C1" />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                Dawa Bazzar, Indore, India
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Phone size={20} color="#2E86C1" />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                +91 98765 43210
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Mail size={20} color="#2E86C1" />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                contact@dawasansaar.com
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Clock size={20} color="#2E86C1" />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                                Open Hours: 9:00 AM - 8:00 PM
                            </Typography>
                        </Box>

                        <Typography variant="subtitle2" color="primary" sx={{ mt: 3, mb: 2 }}>
                            Get in touch for query
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                placeholder="Your email"
                                variant="outlined"
                                size="small"
                                sx={{
                                    flexGrow: 1,
                                    mr: { xs: 0.5, sm: 1 } // smaller gap on small screens
                                }}
                            />
                            <IconButton color="primary" aria-label="send message" size="small">
                                <Send size={20} />
                            </IconButton>
                        </Box>

                    </Grid>

                    {/* Policies Section */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" color="primary" fontWeight="600" gutterBottom>
                            Policies
                        </Typography>
                        <Link href="#" color="inherit" sx={{ display: "block", mb: 1, textDecoration: "none", '&:hover': { color: '#2E86C1' } }}>
                            Terms and Conditions
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: "block", mb: 1, textDecoration: "none", '&:hover': { color: '#2E86C1' } }}>
                            Privacy Policy
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: "block", mb: 1, textDecoration: "none", '&:hover': { color: '#2E86C1' } }}>
                            Vendor Policy
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: "block", mb: 1, textDecoration: "none", '&:hover': { color: '#2E86C1' } }}>
                            Return, Refund and Cancellation Policy
                        </Link>
                        <Link href="#" color="inherit" sx={{ display: "block", mb: 1, textDecoration: "none", '&:hover': { color: '#2E86C1' } }}>
                            Shipping and Delivery Policy
                        </Link>
                    </Grid>

                    {/* About Us Section */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" color="primary" fontWeight="600" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Dawa Sansaar is a trusted platform connecting patients with quality healthcare products and services.
                            We are committed to making healthcare accessible and affordable for everyone. Our extensive
                            network of pharmacies and healthcare providers ensures that you get the best products at the best prices.
                        </Typography>

                        {/* Social Media Icons */}
                        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                            <IconButton color="primary" aria-label="facebook" size="small">
                                <Facebook size={20} />
                            </IconButton>
                            <IconButton color="primary" aria-label="instagram" size="small">
                                <Instagram size={20} />
                            </IconButton>
                            <IconButton color="primary" aria-label="twitter" size="small">
                                <Twitter size={20} />
                            </IconButton>
                            <IconButton color="primary" aria-label="linkedin" size="small">
                                <Linkedin size={20} />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Copyright */}
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" justifyContent="center">
                        <Copyright size={16} style={{ marginRight: "5px" }} />
                        {new Date().getFullYear()} Dawa Sansaar. All Rights Reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
