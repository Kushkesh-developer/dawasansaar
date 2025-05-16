import { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    InputAdornment,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { ChevronRight as ChevronRightIcon } from 'lucide-react';
import { SiFacebook } from 'react-icons/si';

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const BrandSection = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(4),
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        borderTopLeftRadius: theme.shape.borderRadius * 2,
        borderBottomLeftRadius: theme.shape.borderRadius * 2,
    }
}));

const SocialLoginButton = styled(Button)(({ theme }) => ({
    justifyContent: 'center',
    padding: theme.spacing(1.5),
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    '&:hover': {
        backgroundColor: theme.palette.grey[50],
    },
}));

export default function DawasansaarLogin() {
    const theme = useTheme();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [rememberMe, setRememberMe] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setIsPhoneValid(value === '' || /^\d{0,10}$/.test(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phoneNumber.length === 10) {
            console.log('Sending OTP to', phoneNumber);
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 }, mt: { xs: 2, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
                <Paper elevation={5} sx={{ borderRadius: { xs: 2, md: 4 }, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                    <BrandSection sx={{ width: { xs: 'auto', md: '40%' }, minHeight: { xs: '200px', md: 'auto' } }}>
                        <Box component="img" src="/api/placeholder/180/60" alt="Dawasansar Logo" sx={{ mb: 3, width: { xs: '140px', sm: '160px' } }} />
                        <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                            Welcome to Dawasansaar
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 3, color: 'primary.light' }}>
                            India's trusted pharmacy & healthcare platform
                        </Typography>
                        <Box component="img" src="/api/placeholder/250/250" alt="Pharmacy Illustration" sx={{ maxWidth: '100%', maxHeight: { xs: '140px', sm: '200px' }, mb: 2, display: { xs: 'none', sm: 'block' } }} />
                        <Box component="img" src="/api/placeholder/100/100" alt="Decoration" sx={{ position: 'absolute', bottom: 16, right: 16, opacity: 0.1, transform: 'rotate(12deg)', display: { xs: 'none', md: 'block' } }} />
                    </BrandSection>

                    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, width: { xs: 'auto', md: '60%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="text.primary" sx={{ mb: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                           User Sign In / Sign Up
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Sign up or Sign in to access your orders, special offers, health tips and more!
                        </Typography>

                        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }} indicatorColor="primary">
                            <Tab label="Phone" />
                            <Tab label="Email" />
                        </Tabs>

                        <Box sx={{ display: activeTab === 0 ? 'block' : 'none' }}>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5 }}>
                                    PHONE NUMBER
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter your 10-digit mobile number"
                                    error={!isPhoneValid}
                                    helperText={!isPhoneValid ? "Please enter valid 10-digit number" : ""}
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography sx={{ mr: 1 }}>+91</Typography>
                                                <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />} label="Remember me" sx={{ mb: 2 }} />
                                <Button type="submit" fullWidth variant="contained" color="primary" disabled={phoneNumber.length !== 10} endIcon={<ChevronRightIcon />} sx={{ py: 1.5, mb: 3, fontWeight: 'bold', borderRadius: theme.shape.borderRadius * 1.5 }}>
                                    Continue with OTP
                                </Button>
                            </form>
                        </Box>

                        <Box sx={{ display: activeTab === 1 ? 'block' : 'none' }}>
                            <form>
                                <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5 }}>
                                    EMAIL ADDRESS
                                </Typography>
                                <TextField fullWidth type="email" placeholder="Enter your email address" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} sx={{ mb: 2 }} />
                                <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />} label="Remember me" sx={{ mb: 2 }} />
                                <Button fullWidth variant="contained" color="primary" endIcon={<ChevronRightIcon />} sx={{ py: 1.5, mb: 3, fontWeight: 'bold', borderRadius: theme.shape.borderRadius * 1.5 }}>
                                    Continue
                                </Button>
                            </form>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <Divider sx={{ flexGrow: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ mx: 2 }}>
                                OR CONTINUE WITH
                            </Typography>
                            <Divider sx={{ flexGrow: 1 }} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Button fullWidth variant="outlined" sx={{ fontWeight: 300 }}>
                                        Login/Signup as Vendor
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Button fullWidth variant="outlined" sx={{ fontWeight: 300 }}>
                                        Login as InventoryPerson
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <SocialLoginButton fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                                    Google
                                </SocialLoginButton>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12,md:6 }}>
                                <SocialLoginButton fullWidth variant="outlined" startIcon={<SiFacebook color="#1877F2" size={18} />}>
                                    Facebook
                                </SocialLoginButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>

            <Box sx={{ mt: 'auto', py: 2, textAlign: 'center', bgcolor: 'white', borderTop: 1, borderColor: 'grey.200', px: { xs: 2, sm: 3 } }}>
                <Typography variant="body2" color="text.secondary">
                    By continuing you agree to our{' '}
                    <Typography component="a" href="#" variant="body2" fontWeight="medium" color="primary">
                        Terms of service
                    </Typography>{' '}
                    and{' '}
                    <Typography component="a" href="#" variant="body2" fontWeight="medium" color="primary">
                        Privacy & Legal Policy
                    </Typography>.
                </Typography>
            </Box>
        </Box>
    );
}
