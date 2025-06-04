import React, { useState } from 'react';
import { Container, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import UserProfileSummary from '../components/UserProfileSummary';
import ProfileMenu from '../components/ProfileMenu';
import LogoutDialog from '../components/LogoutDialog';

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const openLogoutDialog = () => setLogoutDialogOpen(true);
  const closeLogoutDialog = () => setLogoutDialogOpen(false);

  const handleLogout = async () => {
    try { 
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setLogoutDialogOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Redirect to account page if on base profile route
  React.useEffect(() => {
    if (location.pathname === '/profile' || location.pathname === '/profile/') {
      navigate('/profile/account', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
      <Typography variant="h4" component="h1" fontWeight={600} mb={3}>
        Your Account
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{xs:12,md:4}}>
          <UserProfileSummary user={user} />
          <ProfileMenu onLogout={openLogoutDialog} />
        </Grid>
        
        <Grid size={{xs:12,md:8}}>
          <Outlet />
        </Grid>
      </Grid>

      <LogoutDialog 
        open={logoutDialogOpen}
        onClose={closeLogoutDialog}
        onConfirm={handleLogout}
      />
    </Container>
  );
};

export default ProfilePage;
