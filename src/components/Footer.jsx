import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    TextField,
    IconButton,
    Divider,
    Stack,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Paper
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
    Copyright,
    X,
} from "lucide-react";

const Footer = () => {
    const [aboutUsData, setAboutUsData] = useState(null);
    const [termsData, setTermsData] = useState(null);
    const [privacyData, setPrivacyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Dialog states
    const [openTerms, setOpenTerms] = useState(false);
    const [openPrivacy, setOpenPrivacy] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);

    useEffect(() => {
        const fetchAboutUs = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://ruby-dawasansar.onrender.com/about_us');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data && data.length > 0) {
                    setAboutUsData(data[0]);
                } else {
                    throw new Error('No about us data found');
                }
            } catch (err) {
                console.error('Error fetching about us data:', err);
                setError(err.message);
                setAboutUsData({
                    title: "About Us",
                    description: "Dawa Sansaar is a trusted platform connecting patients with quality healthcare products and services. We are committed to making healthcare accessible and affordable for everyone. Our extensive network of pharmacies and healthcare providers ensures that you get the best products at the best prices."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchAboutUs();
    }, []);

    const fetchTermsAndConditions = async () => {
        try {
            setDialogLoading(true);
            const response = await fetch('https://ruby-dawasansar.onrender.com/terms_and_conditions?role=user');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setTermsData(data);
        } catch (err) {
            console.error('Error fetching terms and conditions:', err);
            setTermsData({
                title: "Terms and Conditions",
                description: "Unable to load terms and conditions. Please try again later."
            });
        } finally {
            setDialogLoading(false);
        }
    };

    const fetchPrivacyPolicy = async () => {
        try {
            setDialogLoading(true);
            const response = await fetch('https://ruby-dawasansar.onrender.com/privacy_policies?role=user');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setPrivacyData(data);
        } catch (err) {
            console.error('Error fetching privacy policy:', err);
            setPrivacyData({
                title: "Privacy Policy",
                description: "Unable to load privacy policy. Please try again later."
            });
        } finally {
            setDialogLoading(false);
        }
    };

    const handleTermsClick = () => {
        setOpenTerms(true);
        if (!termsData) {
            fetchTermsAndConditions();
        }
    };

    const handlePrivacyClick = () => {
        setOpenPrivacy(true);
        if (!privacyData) {
            fetchPrivacyPolicy();
        }
    };

    const handleCloseTerms = () => {
        setOpenTerms(false);
    };

    const handleClosePrivacy = () => {
        setOpenPrivacy(false);
    };

    return (
        <>
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
                                        mr: { xs: 0.5, sm: 1 }
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
                            <Link 
                                component="button"
                                onClick={handleTermsClick}
                                color="inherit" 
                                sx={{ 
                                    display: "block", 
                                    mb: 1, 
                                    textDecoration: "none", 
                                    textAlign: "left",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    '&:hover': { color: '#2E86C1' } 
                                }}
                            >
                                Terms and Conditions
                            </Link>
                            <Link 
                                component="button"
                                onClick={handlePrivacyClick}
                                color="inherit" 
                                sx={{ 
                                    display: "block", 
                                    mb: 1, 
                                    textDecoration: "none", 
                                    textAlign: "left",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    '&:hover': { color: '#2E86C1' } 
                                }}
                            >
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

                        {/* About Us Section with API Integration */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Typography variant="h6" color="primary" fontWeight="600" gutterBottom>
                                {aboutUsData?.title || 'About Us'}
                            </Typography>
                            
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                    <CircularProgress size={24} />
                                </Box>
                            ) : (
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    paragraph
                                    sx={{
                                        textAlign: 'justify',
                                        lineHeight: 1.6,
                                        textIndent: '1em',
                                        hyphens: 'auto',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    {aboutUsData?.description}
                                </Typography>
                            )}

                            {error && (
                                <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1 }}>
                                    Note: Using fallback content due to API issue
                                </Typography>
                            )}

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

            {/* Terms and Conditions Full-Screen Popup */}
            <Dialog
                open={openTerms}
                onClose={handleCloseTerms}
                fullScreen
                sx={{
                    zIndex: 9999,
                    '& .MuiDialog-paper': {
                        bgcolor: '#ffffff',
                        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                    }
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100vh',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 3,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '2px solid #2E86C1',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <Typography variant="h4" color="primary" fontWeight="700">
                            {termsData?.title || 'Terms and Conditions'}
                        </Typography>
                        <Button 
                            onClick={handleCloseTerms} 
                            variant="outlined" 
                            color="error"
                            startIcon={<X />}
                            sx={{ 
                                borderRadius: 3,
                                px: 3,
                                '&:hover': {
                                    bgcolor: 'error.main',
                                    color: 'white'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>

                    {/* Content */}
                    <Box sx={{ 
                        flex: 1, 
                        overflow: 'auto',
                        p: 4,
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Container maxWidth="md">
                            {dialogLoading ? (
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    height: '50vh'
                                }}>
                                    <CircularProgress size={60} thickness={4} />
                                </Box>
                            ) : (
                                <Paper 
                                    elevation={8} 
                                    sx={{ 
                                        p: 5, 
                                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: 4,
                                        border: '1px solid rgba(46, 134, 193, 0.2)'
                                    }}
                                >
                                    <Typography 
                                        variant="h5" 
                                        color="primary" 
                                        gutterBottom
                                        sx={{ borderBottom: '2px solid #2E86C1', pb: 2, mb: 4 }}
                                    >
                                        {termsData?.title || 'Terms and Conditions'}
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        color="text.primary"
                                        sx={{
                                            textAlign: 'justify',
                                            lineHeight: 2,
                                            textIndent: '2em',
                                            hyphens: 'auto',
                                            wordBreak: 'break-word',
                                            fontSize: '1.1rem',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        {termsData?.description}
                                    </Typography>
                                    {termsData?.created_at && (
                                        <Typography 
                                            variant="caption" 
                                            color="text.secondary" 
                                            sx={{ 
                                                display: 'block', 
                                                mt: 4, 
                                                textAlign: 'right',
                                                fontStyle: 'italic'
                                            }}
                                        >
                                            Last updated: {new Date(termsData.created_at).toLocaleDateString()}
                                        </Typography>
                                    )}
                                </Paper>
                            )}
                        </Container>
                    </Box>
                </Box>
            </Dialog>

            {/* Privacy Policy Full-Screen Popup */}
            <Dialog
                open={openPrivacy}
                onClose={handleClosePrivacy}
                fullScreen
                sx={{
                    zIndex: 9999,
                    '& .MuiDialog-paper': {
                        bgcolor: '#ffffff',
                        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                    }
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100vh',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 3,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '2px solid #2E86C1',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <Typography variant="h4" color="primary" fontWeight="700">
                            {privacyData?.title || 'Privacy Policy'}
                        </Typography>
                        <Button 
                            onClick={handleClosePrivacy} 
                            variant="outlined" 
                            color="error"
                            startIcon={<X />}
                            sx={{ 
                                borderRadius: 3,
                                px: 3,
                                '&:hover': {
                                    bgcolor: 'error.main',
                                    color: 'white'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>

                    {/* Content */}
                    <Box sx={{ 
                        flex: 1, 
                        overflow: 'auto',
                        p: 4,
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Container maxWidth="md">
                            {dialogLoading ? (
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    height: '50vh'
                                }}>
                                    <CircularProgress size={60} thickness={4} />
                                </Box>
                            ) : (
                                <Paper 
                                    elevation={8} 
                                    sx={{ 
                                        p: 5, 
                                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: 4,
                                        border: '1px solid rgba(46, 134, 193, 0.2)'
                                    }}
                                >
                                    <Typography 
                                        variant="h5" 
                                        color="primary" 
                                        gutterBottom
                                        sx={{ borderBottom: '2px solid #2E86C1', pb: 2, mb: 4 }}
                                    >
                                        {privacyData?.title || 'Privacy Policy'}
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        color="text.primary"
                                        sx={{
                                            textAlign: 'justify',
                                            lineHeight: 2,
                                            textIndent: '2em',
                                            hyphens: 'auto',
                                            wordBreak: 'break-word',
                                            fontSize: '1.1rem',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        {privacyData?.description}
                                    </Typography>
                                    {privacyData?.created_at && (
                                        <Typography 
                                            variant="caption" 
                                            color="text.secondary" 
                                            sx={{ 
                                                display: 'block', 
                                                mt: 4, 
                                                textAlign: 'right',
                                                fontStyle: 'italic'
                                            }}
                                        >
                                            Last updated: {new Date(privacyData.created_at).toLocaleDateString()}
                                        </Typography>
                                    )}
                                </Paper>
                            )}
                        </Container>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
};

export default Footer;