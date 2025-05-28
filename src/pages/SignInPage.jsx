import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
    useTheme,
    Grid,
    Alert,
    CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const FacebookIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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

// Validation schemas
const phoneSchema = z.object({
    phoneNumber: z.string()
        .min(10, 'Phone number must be 10 digits')
        .max(10, 'Phone number must be 10 digits')
        .regex(/^\d+$/, 'Phone number must contain only digits'),
    rememberMe: z.boolean().optional()
});

const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional()
});

export default function SignInPage() {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const phoneForm = useForm({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phoneNumber: '',
            rememberMe: false
        }
    });

    const emailForm = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setError('');
        setSuccess('');
    };

    // API call function
    const loginWithEmail = async (email, password, passwordConfirmation) => {
        try {
            const response = await fetch('https://ruby-dawasansar.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    // Store session data
    const storeSession = (token, accountData) => {
        // Store only token in localStorage as requested
        localStorage.setItem('authToken', token);
        
        console.log('Token stored in localStorage:', token);
    };

    const onPhoneSubmit = (data) => {
        console.log('Phone login:', data);
        setError('Phone login not implemented yet');
        // Handle phone login - you'd need to implement the phone-based login API
    };

    const onEmailSubmit = async (data) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await loginWithEmail(
                data.email, 
                data.password, 
                data.password // Using password as confirmation for now
            );

            // Store the session
            storeSession(result.token, result.account.data);
            
            setSuccess(`Welcome back, ${result.account.data.attributes.first_name}! Redirecting to home...`);
            
            // Redirect to home page after short delay
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
            
            console.log('Login successful:', result);
            console.log('Token stored:', result.token);

        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 }, mt: { xs: 2, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
                <Paper elevation={5} sx={{ borderRadius: { xs: 2, md: 4 }, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                    <BrandSection sx={{ width: { xs: 'auto', md: '40%' }, minHeight: { xs: '200px', md: 'auto' } }}>
                        <Box 
                            sx={{ 
                                mb: 3, 
                                width: { xs: '140px', sm: '160px' },
                                height: '60px',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">Dawasansar</Typography>
                        </Box>
                        <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                            Welcome Back to Dawasansaar
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 3, color: 'primary.light' }}>
                            India's trusted pharmacy & healthcare platform
                        </Typography>
                        <Box 
                            sx={{ 
                                maxWidth: '100%', 
                                maxHeight: { xs: '140px', sm: '200px' }, 
                                mb: 2, 
                                display: { xs: 'none', sm: 'flex' },
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                borderRadius: 2,
                                width: '250px',
                                height: '200px'
                            }}
                        >
                            <Typography>🏥 Pharmacy Illustration</Typography>
                        </Box>
                    </BrandSection>

                    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, width: { xs: 'auto', md: '60%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h5" fontWeight="bold" color="text.primary" sx={{ mb: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                            Sign In
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Sign in to access your orders, special offers, health tips and more!
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {success}
                            </Alert>
                        )}

                        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" sx={{ mb: 3 }} indicatorColor="primary">
                            <Tab label="Phone" />
                            <Tab label="Email" />
                        </Tabs>

                        <Box sx={{ display: activeTab === 0 ? 'block' : 'none' }}>
                            <Box component="div" onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}>
                                <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                    PHONE NUMBER
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter your 10-digit mobile number"
                                    error={!!phoneForm.formState.errors.phoneNumber}
                                    helperText={phoneForm.formState.errors.phoneNumber?.message}
                                    {...phoneForm.register('phoneNumber')}
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
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            color="primary" 
                                            {...phoneForm.register('rememberMe')}
                                        />
                                    } 
                                    label="Remember me" 
                                    sx={{ mb: 2 }} 
                                />
                                <Button 
                                    onClick={phoneForm.handleSubmit(onPhoneSubmit)}
                                    fullWidth 
                                    variant="contained" 
                                    color="primary" 
                                    endIcon={<ArrowRight />} 
                                    sx={{ py: 1.5, mb: 3, fontWeight: 'bold', borderRadius: theme.shape.borderRadius * 1.5 }}
                                >
                                    Continue with OTP
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ display: activeTab === 1 ? 'block' : 'none' }}>
                            <Box component="div" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                                <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                    EMAIL ADDRESS
                                </Typography>
                                <TextField 
                                    fullWidth 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    error={!!emailForm.formState.errors.email}
                                    helperText={emailForm.formState.errors.email?.message}
                                    {...emailForm.register('email')}
                                    sx={{ mb: 2 }}
                                    disabled={loading}
                                />
                                <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                    PASSWORD
                                </Typography>
                                <TextField 
                                    fullWidth 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    error={!!emailForm.formState.errors.password}
                                    helperText={emailForm.formState.errors.password?.message}
                                    {...emailForm.register('password')}
                                    sx={{ mb: 2 }}
                                    disabled={loading}
                                />
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            color="primary" 
                                            {...emailForm.register('rememberMe')}
                                            disabled={loading}
                                        />
                                    } 
                                    label="Remember me" 
                                    sx={{ mb: 2 }} 
                                />
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={emailForm.handleSubmit(onEmailSubmit)}
                                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowRight />}
                                    disabled={loading}
                                    sx={{ py: 1.5, mb: 3, fontWeight: 'bold', borderRadius: theme.shape.borderRadius * 1.5 }}
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </Box>
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
                                <Grid item xs={12} sm={6}>
                                    <Button fullWidth variant="outlined" sx={{ fontWeight: 300 }}>
                                        Login as Vendor
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button fullWidth variant="outlined" sx={{ fontWeight: 300 }}>
                                        Login as InventoryPerson
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <SocialLoginButton fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                                    Google
                                </SocialLoginButton>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SocialLoginButton fullWidth variant="outlined" startIcon={<FacebookIcon />}>
                                    Facebook
                                </SocialLoginButton>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <Typography component="a" href="/signup" variant="body2" fontWeight="medium" color="primary" sx={{ textDecoration: 'none' }}>
                                    Sign Up
                                </Typography>
                            </Typography>
                        </Box>
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