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
    FormControl,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
    useTheme,
    FormHelperText,
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

// Validation schema
const signUpSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phoneNumber: z.string()
        .min(10, 'Phone number must be 10 digits')
        .max(10, 'Phone number must be 10 digits')
        .regex(/^\d+$/, 'Phone number must contain only digits'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: z.string().min(6, 'Password confirmation must be at least 6 characters'),
    address: z.string().min(10, 'Please enter a complete address'),
    role: z.number().min(0).max(2),
    agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions')
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
});

export default function SignUpPage() {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            passwordConfirmation: '',
            address: '',
            role: 0,
            agreeToTerms: false
        }
    });

    // API call function
    const signUpWithAPI = async (accountData) => {
        try {
            const response = await fetch('https://ruby-dawasansar.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account: accountData
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

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Prepare data according to API structure
            const accountData = {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
                password_confirmation: data.passwordConfirmation,
                addressess: data.address, // Note: API uses 'addressess' (with double 's')
                role: data.role,
                phone_number: parseInt(data.phoneNumber) // Convert to number
            };

            const result = await signUpWithAPI(accountData);
            
            setSuccess('Account created successfully! Redirecting to login...');
            
            console.log('Signup successful:', result);
            
            // Redirect to login page after successful signup
            setTimeout(() => {
                window.location.href = '/signin';
            }, 2000);

        } catch (error) {
            console.error('Signup error:', error);
            setError('Signup failed. Please check your information and try again.');
        } finally {
            setLoading(false);
        }
    };

    const roleOptions = [
        { value: 0, label: 'User' },
        { value: 1, label: 'Vendor' },
        { value: 2, label: 'Inventory Person' }
    ];

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
                            Join Dawasansaar Today
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
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Create your account to access exclusive offers, track orders, and more!
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

                        <Box component="div">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                        FIRST NAME
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your first name"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                        {...register('firstName')}
                                        sx={{ mb: 2 }}
                                        disabled={loading}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                        LAST NAME
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your last name"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        {...register('lastName')}
                                        sx={{ mb: 2 }}
                                        disabled={loading}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                EMAIL ADDRESS
                            </Typography>
                            <TextField
                                fullWidth
                                type="email"
                                placeholder="Enter your email address"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register('email')}
                                sx={{ mb: 2 }}
                                disabled={loading}
                            />

                            <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                PHONE NUMBER
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter your 10-digit mobile number"
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                                {...register('phoneNumber')}
                                sx={{ mb: 2 }}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Typography sx={{ mr: 1 }}>+91</Typography>
                                            <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                        PASSWORD
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        placeholder="Enter your password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        {...register('password')}
                                        sx={{ mb: 2 }}
                                        disabled={loading}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                        CONFIRM PASSWORD
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        placeholder="Confirm your password"
                                        error={!!errors.passwordConfirmation}
                                        helperText={errors.passwordConfirmation?.message}
                                        {...register('passwordConfirmation')}
                                        sx={{ mb: 2 }}
                                        disabled={loading}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                ADDRESS
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Enter your complete address"
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                {...register('address')}
                                sx={{ mb: 2 }}
                                disabled={loading}
                            />

                            <Typography variant="caption" fontWeight="medium" color="primary" sx={{ mb: 0.5, display: 'block' }}>
                                ACCOUNT TYPE
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Select
                                    {...register('role')}
                                    error={!!errors.role}
                                    defaultValue={0}
                                    disabled={loading}
                                >
                                    {roleOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.role && (
                                    <FormHelperText error>{errors.role.message}</FormHelperText>
                                )}
                            </FormControl>

                            {/* Terms and Privacy Policy with Checkbox */}
                            <Box sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                                <Checkbox
                                    color="primary"
                                    {...register('agreeToTerms')}
                                    sx={{ p: 0.5, mt: -0.7 }}
                                    disabled={loading}
                                />
                                <Box sx={{ flex: 1 }} >
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                        I agree to the{' '}
                                        <Typography component="a" href="#" variant="body2" fontWeight="medium" color="primary" sx={{ textDecoration: 'none' }}>
                                            Terms of Service
                                        </Typography>{' '}
                                        and{' '}
                                        <Typography component="a" href="#" variant="body2" fontWeight="medium" color="primary" sx={{ textDecoration: 'none' }}>
                                            Privacy Policy
                                        </Typography>
                                    </Typography>
                                    {errors.agreeToTerms && (
                                        <FormHelperText error sx={{ ml: 0.5 }}>
                                            {errors.agreeToTerms?.message}
                                        </FormHelperText>
                                    )}
                                </Box>
                            </Box>

                            <Button
                                onClick={handleSubmit(onSubmit)}
                                fullWidth
                                variant="contained"
                                color="primary"
                                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowRight />}
                                disabled={loading}
                                sx={{ py: 1.5, mb: 3, fontWeight: 'bold', borderRadius: theme.shape.borderRadius * 1.5 }}
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <Divider sx={{ flexGrow: 1 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ mx: 2 }}>
                                OR CONTINUE WITH
                            </Typography>
                            <Divider sx={{ flexGrow: 1 }} />
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <SocialLoginButton fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                                    Google
                                </SocialLoginButton>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <SocialLoginButton fullWidth variant="outlined" startIcon={<FacebookIcon />}>
                                    Facebook
                                </SocialLoginButton>
                            </Grid>
                        </Grid>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Typography component="a" href="/signin" variant="body2" fontWeight="medium" color="primary" sx={{ textDecoration: 'none' }}>
                                    Sign In
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}