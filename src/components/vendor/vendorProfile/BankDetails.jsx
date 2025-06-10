import React from "react";
import {
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AccountBalance, Visibility, VisibilityOff } from "@mui/icons-material";

const BankDetails = ({ formData, handleChange }) => {
  const [showAccountNumber, setShowAccountNumber] = React.useState(false);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Bank Account Information
      </Typography>

      {/* Account Number */}
      <TextField
        fullWidth
        label="Bank Account Number"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleChange}
        margin="normal"
        required
        type={showAccountNumber ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountBalance />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowAccountNumber(!showAccountNumber)}
                edge="end"
              >
                {showAccountNumber ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* IFSC Code */}
      <TextField
        fullWidth
        label="IFSC Code"
        name="ifscCode"
        value={formData.ifscCode}
        onChange={handleChange}
        margin="normal"
        required
        inputProps={{
          maxLength: 11,
          style: { textTransform: "uppercase" },
        }}
        helperText="Format: ABCD0123456"
        FormHelperTextProps={{
          sx: { textAlign: "right", marginLeft: 0 },
        }}
      />

      {/* Account Holder Name (Auto-filled if available) */}
      {formData.accountHolderName && (
        <TextField
          fullWidth
          label="Account Holder Name"
          name="accountHolderName"
          value={formData.accountHolderName}
          margin="normal"
          disabled
        />
      )}
    </Box>
  );
};

export default BankDetails; 