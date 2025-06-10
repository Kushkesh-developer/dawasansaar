import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box
} from '@mui/material';
import { Search, Package } from 'lucide-react';



const InventoryFilters = ({
  searchTerm,
  categoryFilter,
  stockFilter,
  onSearchChange,
  onCategoryChange,
  onStockChange
}) => {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 250 }}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: <Search size={20} color="#666" style={{ marginRight: 8 }} />
              }}
            />
          </Box>
          
          <Box sx={{ flex: '0 0 200px' }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="surgical">Surgical</MenuItem>
                <MenuItem value="medical">Medical</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ flex: '0 0 200px' }}>
            <FormControl fullWidth>
              <InputLabel>Stock Status</InputLabel>
              <Select
                value={stockFilter}
                label="Stock Status"
                onChange={(e) => onStockChange(e.target.value)}
              >
                <MenuItem value="all">All Stock</MenuItem>
                <MenuItem value="low">Low Stock</MenuItem>
                <MenuItem value="out">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ flex: '0 0 120px' }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Package size={20} />}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InventoryFilters;
