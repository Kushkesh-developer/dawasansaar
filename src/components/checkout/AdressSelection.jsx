import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid
} from '@mui/material';
import { MapPin, Plus } from 'lucide-react';





const AddressSelection = ({ selectedAddress, onAddressSelect }) => {
  const [addresses] = useState([
    {
      id: '1',
      name: 'kushkesh bhadauriya',
      address: 'b-49 sector b dudhichua, near manpur',
      city: 'Allahabad',
      state: 'Uttar Pradesh',
      pincode: '221007',
      phone: '+91 - 9522559908',
      isDefault: true
    },
    {
      id: '2',
      name: 'John Doe',
      address: 'A-123 New Colony, Civil Lines',
      city: 'Prayagraj',
      state: 'Uttar Pradesh',
      pincode: '211001',
      phone: '+91 - 9876543210'
    }
  ]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const handleAddressChange = (event) => {
    const addressId = event.target.value;
    const address = addresses.find(addr => addr.id === addressId);
    if (address) {
      onAddressSelect(address);
    }
  };

  const handleAddNewAddress = () => {
    // In a real app, this would save to backend
    console.log('Adding new address:', newAddress);
    setOpenAddDialog(false);
    setNewAddress({
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MapPin size={20} style={{ marginRight: 8 }} />
        <Typography variant="h6" fontWeight="600">
          DELIVERY ADDRESS
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Plus size={16} />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ ml: 'auto', color: '#e91e63', borderColor: '#e91e63' }}
        >
          SELECT ADDRESS
        </Button>
      </Box>

      <RadioGroup value={selectedAddress?.id || ''} onChange={handleAddressChange}>
        {addresses.map((address) => (
          <Paper 
            key={address.id} 
            variant="outlined" 
            sx={{ 
              p: 2, 
              mb: 2,
              border: selectedAddress?.id === address.id ? '2px solid #2E86C1' : '1px solid #e0e0e0'
            }}
          >
            <FormControlLabel
              value={address.id}
              control={<Radio sx={{ color: '#2E86C1', '&.Mui-checked': { color: '#2E86C1' } }} />}
              label={
                <Box>
                  <Typography variant="subtitle1" fontWeight="600">
                    {address.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.city} - {address.pincode}, {address.state}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.phone}
                  </Typography>
                </Box>
              }
            />
          </Paper>
        ))}
      </RadioGroup>

      {/* Add Address Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={newAddress.address}
                onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Pincode"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNewAddress} variant="contained">
            Add Address
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AddressSelection;
