import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';





const EditProductDialog = ({ open, product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'medical',
    price: '',
    quantity: '',
    lowStockThreshold: '',
    expiryDate: '',
    image: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        quantity: product.quantity.toString(),
        lowStockThreshold: product.lowStockThreshold.toString(),
        expiryDate: product.expiryDate,
        image: product.image
      });
    }
  }, [product]);

  const handleSubmit = () => {
    if (!product) return;

    const updates = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      lowStockThreshold: Number(formData.lowStockThreshold),
      expiryDate: formData.expiryDate,
      image: formData.image
    };

    onSave(product.id, updates);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            fullWidth
            label="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="medical">Medical</MenuItem>
                <MenuItem value="surgical">Surgical</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              sx={{ flex: 1 }}
              label="Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              sx={{ flex: 1 }}
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            
            <TextField
              sx={{ flex: 1 }}
              label="Low Stock Threshold"
              type="number"
              value={formData.lowStockThreshold}
              onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
            />
          </Box>

          <TextField
            fullWidth
            label="Expiry Date"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.name || !formData.price || !formData.quantity}
        >
          Update Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
