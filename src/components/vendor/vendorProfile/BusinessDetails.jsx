import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const BusinessDetails = ({ formData, handleChange }) => {
  return (
    <>
      <TextField
        fullWidth
        label="Business Name"
        name="businessName"
        value={formData.businessName}
        onChange={handleChange}
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Business Type</InputLabel>
        <Select
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
        >
          <MenuItem value="retailer">Retailer</MenuItem>
          <MenuItem value="distributor">Distributor</MenuItem>
          <MenuItem value="wholesaler">Wholesaler</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default BusinessDetails;