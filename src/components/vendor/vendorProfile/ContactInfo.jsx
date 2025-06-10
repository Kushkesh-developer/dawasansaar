import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@mui/material";
import {
  Phone,
  Email,
  WhatsApp,
  LocalShipping,
  HelpOutline,
} from "@mui/icons-material";

const ContactInfo = ({ formData, handleChange }) => {
  const [sameAsWhatsapp, setSameAsWhatsapp] = useState(false);

  const handleWhatsappToggle = (e) => {
    setSameAsWhatsapp(e.target.checked);
    if (e.target.checked) {
      handleChange({
        target: { name: "whatsapp", value: formData.phone },
      });
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>

      <Grid container spacing={2}>
        {/* Phone Number */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number*"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10,
              pattern: "[0-9]{10}",
            }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email*"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* WhatsApp Number */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="WhatsApp Number"
            name="whatsapp"
            value={sameAsWhatsapp ? formData.phone : formData.whatsapp}
            onChange={handleChange}
            margin="normal"
            disabled={sameAsWhatsapp}
            type="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WhatsApp color="success" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sameAsWhatsapp}
                        onChange={handleWhatsappToggle}
                        color="success"
                        size="small"
                      />
                    }
                    label="Same as phone"
                    sx={{ mr: 0 }}
                  />
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 10,
              pattern: "[0-9]{10}",
            }}
          />
        </Grid>

        {/* Delivery Capacity */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Daily Delivery Capacity*"
            name="deliveryCapacity"
            value={formData.deliveryCapacity}
            onChange={handleChange}
            margin="normal"
            required
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalShipping />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Max deliveries you can handle per day">
                    <IconButton edge="end" size="small">
                      <HelpOutline fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            inputProps={{
              min: 1,
              max: 1000,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactInfo;