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
    Card,
    CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowRight, Store, Package, BarChart3 } from 'lucide-react';

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

const VendorHeader = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: theme.spacing(6, 0),
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    textAlign: 'center',
    height: '100%',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
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

export default function VendorSignInPage() {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
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
        setSuccess('');
    };

    const onPhoneSubmit = (data) => {
        console.log('Vendor phone login:', data);
        setSuccess('Welcome! Redirecting to vendor dashboard...');
    };

    const onEmailSubmit = (data) => {
        console.log('Vendor email login:', data);
        setSuccess(`Welcome back, vendor! Redirecting to dashboard...`);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {/* Header Section */}
            <VendorHeader>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
                        <Store size={40} />
                        <Typography variant="h3" fontWeight="bold">
                            Vendor Portal
                        </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
                        Grow Your Business with Dawasansaar
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                        Join thousands of vendors who trust us to manage their pharmacy business
                    </Typography>
                </Container>
            </VendorHeader>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 6 }}>

                {/* Login Form */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper 
                        elevation={8} 
                        sx={{ 
                            p: 4, 
                            maxWidth: 500, 
                            width: '100%',
                            borderRadius: 3,
                            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                                Vendor Login
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Access your vendor dashboard
                            </Typography>
                        </Box>

                        {success && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                {success}
                            </Alert>
                        )}

                        <Tabs 
                            value={activeTab} 
                            onChange={handleTabChange} 
                            variant="fullWidth" 
                            sx={{ 
                                mb: 4,
                                '& .MuiTab-root': {
                                    fontWeight: 600,
                                    textTransform: 'none',
                                },
                                '& .Mui-selected': {
                                    color: '#667eea !important'
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#667eea'
                                }
                            }}
                        >
                            <Tab label="📱 Phone Login" />
                            <Tab label="✉️ Email Login" />
                        </Tabs>

                        {/* Phone Login Tab */}
                        <Box sx={{ display: activeTab === 0 ? 'block' : 'none' }}>
                            <Box component="form" onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}>
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: '#667eea' }}>
                                    VENDOR PHONE NUMBER
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter your registered mobile number"
                                    error={!!phoneForm.formState.errors.phoneNumber}
                                    helperText={phoneForm.formState.errors.phoneNumber?.message}
                                    {...phoneForm.register('phoneNumber')}
                                    sx={{ mb: 3 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography sx={{ mr: 1, fontWeight: 'bold' }}>+91</Typography>
                                                <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            sx={{ 
                                                color: '#667eea', 
                                                '&.Mui-checked': { color: '#667eea' } 
                                            }}
                                            {...phoneForm.register('rememberMe')}
                                        />
                                    } 
                                    label="Keep me logged in" 
                                    sx={{ mb: 3 }} 
                                />
                                <Button 
                                    type="submit"
                                    fullWidth 
                                    variant="contained" 
                                    endIcon={<ArrowRight />} 
                                    sx={{ 
                                        py: 2, 
                                        mb: 2, 
                                        fontWeight: 'bold', 
                                        fontSize: '1.1rem',
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                                        }
                                    }}
                                >
                                    Get OTP
                                </Button>
                            </Box>
                        </Box>

                        {/* Email Login Tab */}
                        <Box sx={{ display: activeTab === 1 ? 'block' : 'none' }}>
                            <Box component="form" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: '#667eea' }}>
                                    VENDOR EMAIL
                                </Typography>
                                <TextField 
                                    fullWidth 
                                    type="email" 
                                    placeholder="Enter your registered email" 
                                    error={!!emailForm.formState.errors.email}
                                    helperText={emailForm.formState.errors.email?.message}
                                    {...emailForm.register('email')}
                                    sx={{ mb: 2 }}
                                />
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: '#667eea' }}>
                                    PASSWORD
                                </Typography>
                                <TextField 
                                    fullWidth 
                                    type="password" 
                                    placeholder="Enter your secure password" 
                                    error={!!emailForm.formState.errors.password}
                                    helperText={emailForm.formState.errors.password?.message}
                                    {...emailForm.register('password')}
                                    sx={{ mb: 3 }}
                                />
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            sx={{ 
                                                color: '#667eea', 
                                                '&.Mui-checked': { color: '#667eea' } 
                                            }}
                                            {...emailForm.register('rememberMe')}
                                        />
                                    } 
                                    label="Keep me logged in" 
                                    sx={{ mb: 3 }} 
                                />
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    type="submit"
                                    endIcon={<ArrowRight />}
                                    sx={{ 
                                        py: 2, 
                                        mb: 2, 
                                        fontWeight: 'bold', 
                                        fontSize: '1.1rem',
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                                        }
                                    }}
                                >
                                    Access Dashboard
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                            <Divider sx={{ flexGrow: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ mx: 2, fontWeight: 'bold' }}>
                                OR CONTINUE WITH
                            </Typography>
                            <Divider sx={{ flexGrow: 1 }} />
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
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

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Need a vendor account?{' '}
                                <Typography component="a" href="#" variant="body2" fontWeight="bold" sx={{ color: '#667eea', textDecoration: 'none' }}>
                                   SignUp
                                </Typography>
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container>

            {/* Footer */}
            <Box sx={{ py: 3, textAlign: 'center', bgcolor: 'white', borderTop: 1, borderColor: 'grey.200' }}>
                <Typography variant="body2" color="text.secondary">
                    © 2024 Dawasansaar Vendor Portal. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}
