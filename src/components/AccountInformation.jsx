import React from 'react';
import { Box, Paper, Typography, Button, Grid, Alert, CircularProgress } from '@mui/material';
import { Edit, RefreshCw } from 'lucide-react';

const AccountInformation = ({ user, loading, error, onRetry }) => {

  // Debug logging
  console.log('AccountInformation component received user:', user);
  console.log('Loading state:', loading);
  console.log('Error state:', error);

  return (
    <>
      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, mx: 2 }}
          action={
            onRetry && (
              <Button
                color="inherit"
                size="small"
                onClick={onRetry}
                startIcon={<RefreshCw size={16} />}
              >
                Retry
              </Button>
            )
          }
        >
          {error}
        </Alert>
      )}

      {/* Account Information with title and Edit button */}
      <Box sx={{ mb: 3, mx: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          disabled={loading}
          component="a"
          href="/profile/edit"
        >
          EDIT PROFILE
        </Button>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading account information...</Typography>
        </Box>
      )}

      {/* Account Information Cards */}
      {!loading && (
        <Box sx={{ mx: 2 }}>
          <Grid container spacing={3}>
            {/* Login Information */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary', fontSize: '0.9rem' }}>
                  LOGIN INFORMATION
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    EMAIL
                  </Typography>
                  <Typography variant="body1" fontWeight={500} sx={{
                    color: user?.email && user.email !== 'No email' ? 'text.primary' : 'text.secondary',
                    fontStyle: user?.email && user.email !== 'No email' ? 'normal' : 'italic'
                  }}>
                    {user?.email || "No email"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    MOBILE NUMBER
                  </Typography>
                  <Typography variant="body1" fontWeight={500} sx={{
                    color: user?.phone && user.phone !== 'No phone number' ? 'text.primary' : 'text.secondary',
                    fontStyle: user?.phone && user.phone !== 'No phone number' ? 'normal' : 'italic'
                  }}>
                    {user?.phone || "No phone number"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Personal Information */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary', fontSize: '0.9rem' }}>
                  PERSONAL INFORMATION
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    FULL NAME
                  </Typography>
                  <Typography variant="body1" fontWeight={500} sx={{
                    color: user?.name && user.name !== 'No name' ? 'text.primary' : 'text.secondary',
                    fontStyle: user?.name && user.name !== 'No name' ? 'normal' : 'italic'
                  }}>
                    {user?.name || "No name"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    GENDER
                  </Typography>
                  <Typography variant="body1" fontWeight={500} sx={{
                    color: user?.gender && user.gender !== 'No data' ? 'text.primary' : 'text.secondary',
                    fontStyle: user?.gender && user.gender !== 'No data' ? 'normal' : 'italic'
                  }}>
                    {user?.gender || "No data"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Debug Information Panel */}
          {process.env.NODE_ENV === 'development' && (
            <Paper sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', border: '1px solid #e9ecef' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Debug Information (Development Only)
              </Typography>
              <Typography variant="body2" component="pre" sx={{ 
                fontSize: '0.75rem', 
                overflow: 'auto',
                backgroundColor: '#f1f3f4',
                p: 1,
                borderRadius: 1,
                fontFamily: 'monospace'
              }}>
                {JSON.stringify({
                  userData: user,
                  hasAuthToken: !!localStorage.getItem('authToken'),
                  tokenLength: localStorage.getItem('authToken')?.length || 0,
                  error: error,
                  loading: loading
                }, null, 2)}
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </>
  );
};

export default AccountInformation;