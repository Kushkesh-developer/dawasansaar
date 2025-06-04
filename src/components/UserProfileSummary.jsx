import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';



const UserProfileSummary = ({ user }) => {
  return (
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
  );
};

export default UserProfileSummary;