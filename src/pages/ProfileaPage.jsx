import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Button, 
  Avatar,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { 
  User, 
  Edit, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Grid from '@mui/material/Grid';
import { menuItems, bannerCards } from '../data/ProfileData'; // Import data from separate file

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Handle logout confirmation dialog
  const openLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await logout();
      // Close dialog
      setLogoutDialogOpen(false);
      // Navigate to homepage or login page
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
      <Typography variant="h4" component="h1" fontWeight={600} mb={3}>
        Your Account
      </Typography>
      
      <Grid container spacing={3}>
        {/* Left Side - User Profile Summary & Menu */}
        <Grid size={{xs:12, md:4}}>
          {/* User Profile Summary */}
          <Paper elevation={1} sx={{ mb: 3, p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: '#E1F5FE',
                    color: '#2E86C1',
                    fontSize: 32,
                    fontWeight: 'bold'
                  }}
                >
                  {user?.name ? user.name.charAt(0) : "U"}
                </Avatar>
                <Box 
                  sx={{ 
                    position: 'absolute',
                    bottom: -5,
                    left: -5,
                    width: 90,
                    height: 90,
                    border: '2px solid #E74C3C',
                    borderRadius: '50%',
                    borderTopColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    transform: 'rotate(-45deg)'
                  }}
                />
                <Typography 
                  sx={{ 
                    position: 'absolute', 
                    top: -10, 
                    right: -10,
                    bgcolor: '#E74C3C',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1
                  }}
                >
                  25%
                </Typography>
              </Box>
              
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {user?.name || "User"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email || "No email"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.phone || "No phone"}
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          {/* Navigation Menu */}
          <Paper elevation={1} sx={{ borderRadius: 2 }}>
            <List>
              {menuItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem 
                    component={Link} 
                    to={item.link}
                    sx={{ 
                      py: 1.5,
                      color: 'inherit',
                      textDecoration: 'none',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    <ChevronRight size={18} color="#999" />
                  </ListItem>
                </React.Fragment>
              ))}
              
              {/* Logout Button */}
              <Divider component="li" />
              <ListItem 
                button
                onClick={openLogoutDialog}
                sx={{ 
                  py: 1.5,
                  color: '#e53935',
                  '&:hover': {
                    bgcolor: 'rgba(229, 57, 53, 0.08)'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: '#e53935' }}>
                  <LogOut size={20} />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout" 
                  primaryTypographyProps={{ color: '#e53935', fontWeight: 500 }} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Right Side - Account Information */}
        <Grid size={{xs:12, md:8}}>
          {/* Banner Cards */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              mb: 3
            }}
          >
            {bannerCards.map(card => (
              <Paper
                key={card.id}
                elevation={1}
                sx={{ 
                  flex: 1, 
                  p: 3,
                  borderRadius: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 1,
                      mb: 1
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {card.title}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
          
          {/* Account Information with title and Edit button */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              Account Information
            </Typography>
            <Button 
              variant="contained"
              startIcon={<Edit size={18} />}
              sx={{ 
                bgcolor: '#2E86C1', 
                '&:hover': { bgcolor: '#1A5276' }
              }}
            >
              EDIT PROFILE
            </Button>
          </Box>
          
          {/* Account Information */}
          <Grid container spacing={3}>
            {/* Login Information */}
            <Grid size={{xs:12, sm:6}}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary', fontSize: '0.9rem' }}>
                  LOGIN INFORMATION
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    EMAIL
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.email || "No email"}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    MOBILE NUMBER
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.phone || "No phone number"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            {/* Personal Information */}
            <Grid size={{xs:12, sm:6}}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary', fontSize: '0.9rem' }}>
                  PERSONAL INFORMATION
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    FULL NAME
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.name || "No name"}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    GENDER
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {user?.gender || "No data"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={closeLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out from your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleLogout} 
            color="error" 
            variant="contained"
            startIcon={<LogOut size={16} />}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;