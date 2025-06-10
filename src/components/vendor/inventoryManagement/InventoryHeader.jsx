import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Package } from 'lucide-react';



const InventoryHeader = ({ onAddProduct }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold">
        Inventory Management
      </Typography>
      <Button
        variant="contained"
        startIcon={<Package size={20} />}
        onClick={onAddProduct}
        sx={{ backgroundColor: '#2563eb', '&:hover': { backgroundColor: '#1d4ed8' } }}
      >
        Add Product
      </Button>
    </Box>
  );
};

export default InventoryHeader;