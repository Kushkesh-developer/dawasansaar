import React from 'react';
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { bannerCards } from '../data/ProfileData';

const BannerCards = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
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
  );
};

export default BannerCards;
