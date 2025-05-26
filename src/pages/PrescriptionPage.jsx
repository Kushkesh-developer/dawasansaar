import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid as MuiGrid, 
  Paper, 
  Button, 
  TextField, 
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
  Step,
  Stepper,
  StepLabel,
  StepContent,
  Link as MuiLink,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton
} from '@mui/material';
import { 
  FileText, 
  Upload, 
  Camera, 
  Info, 
  Check, 
  X,
  FilePlus,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Create a Grid component that properly handles the 'item' prop in TypeScript
const Grid = ({ item, ...props }) => <MuiGrid {...props} />;

const PrescriptionPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  // We'll keep uploadMethod for future API integration but mark it with a comment
  const [uploadMethod, setUploadMethod] = useState(null); // Will be used for API integration
  const [fileError, setFileError] = useState("");
  
  // Manual medicine entry
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [frequency, setFrequency] = useState("once_daily");

  // Handle file upload
  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      
      // Check file size (5MB limit)
      const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setFileError(`File(s) exceed the 5MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
        return;
      }
      setFileError("");
      
      setFiles([...files, ...selectedFiles]);
      
      // Create preview URLs
      const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
      
      // Move to next step if this is the first upload
      if (activeStep === 0) {
        setActiveStep(1);
      }
    }
  };

  // Handle camera capture
  const handleCameraCapture = () => {
    setUploadMethod('camera');
    // In a real implementation, this would activate the camera
  };

  // Handle file removal
  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    const newPreviewUrls = [...previewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
    
    if (newFiles.length === 0) {
      setActiveStep(0);
    }
  };

  // Handle medicine addition
  const handleAddMedicine = () => {
    if (medicineName.trim()) {
      setMedicines([
        ...medicines,
        {
          id: Date.now(),
          name: medicineName,
          dosage: dosage,
          quantity: quantity,
          frequency: frequency
        }
      ]);
      setMedicineName("");
      setDosage("");
      setQuantity("");
      setFrequency("once_daily");
    }
  };

  // Handle medicine removal
  const handleRemoveMedicine = (id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  // Handle medicine change for future API integration
  const handleMedicineChange = (e) => {
    // This function will be used for API integration when needed
    // For POST request to add a new medicine
    // For PUT request to update an existing medicine
    console.log('Medicine field updated:', e.target.name, e.target.value);
    // API call would go here in the future
    /*
    Example API integration:
    
    // For adding a new medicine (POST)
    const addMedicineToAPI = async (medicine) => {
      try {
        const response = await fetch('api/medicines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicine)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error adding medicine:', error);
      }
    };
    
    // For updating a medicine (PUT)
    const updateMedicineInAPI = async (medicine) => {
      try {
        const response = await fetch(`api/medicines/${medicine.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicine)
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error updating medicine:', error);
      }
    };
    */
  };

  // Get frequency label
  const getFrequencyLabel = (value) => {
    const options = {
      'once_daily': 'Once daily',
      'twice_daily': 'Twice daily',
      'thrice_daily': 'Three times a day',
      'four_times': 'Four times a day',
      'as_needed': 'As needed',
      'before_meals': 'Before meals',
      'after_meals': 'After meals',
      'at_bedtime': 'At bedtime'
    };
    return options[value] || value;
  };

  // Handle next step
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  // Steps for the prescription upload process
  const steps = [
    {
      label: 'Upload Prescription',
      description: 'Upload a valid prescription from your doctor.',
      content: (
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {fileError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {fileError}
            </Alert>
          )}
          
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              border: '1px dashed #ccc',
              borderRadius: 2,
              bgcolor: 'rgba(46, 134, 193, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box component="label" htmlFor="prescription-upload" sx={{ cursor: 'pointer', width: '100%' }}>
              <input
                id="prescription-upload"
                type="file"
                accept="image/*, application/pdf"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <Box sx={{ textAlign: 'center' }}>
                <Upload size={48} color="#2E86C1" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Upload Prescription
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Upload JPG, JPEG, PNG or PDF (Max size: 5MB)
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ mt: 2, px: 4 }}
                >
                  Browse Files
                </Button>
              </Box>
            </Box>
          </Paper>

          <Divider sx={{ my: 2 }}>
            <Chip label="OR" />
          </Divider>

          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              border: '1px dashed #ccc',
              borderRadius: 2,
              bgcolor: 'rgba(39, 174, 96, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box 
              sx={{ 
                cursor: 'pointer', 
                width: '100%', 
                textAlign: 'center'
              }}
              onClick={handleCameraCapture}
            >
              <Camera size={48} color="#27AE60" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Use Camera
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Take a clear photo of your prescription
              </Typography>
              <Button 
                variant="contained" 
                color="secondary"
                sx={{ mt: 2, px: 4 }}
              >
                Open Camera
              </Button>
            </Box>
          </Paper>

          <Divider sx={{ my: 2 }}>
            <Chip label="OR" />
          </Divider>

          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              border: '1px dashed #ccc',
              borderRadius: 2,
              bgcolor: 'rgba(241, 196, 15, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box
              sx={{ 
                width: '100%', 
                textAlign: 'center' 
              }}
            >
              <Plus size={48} color="#E67E22" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Add Medicines Manually
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Enter your medicine details manually
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mt: 2, px: 4, bgcolor: '#E67E22', '&:hover': { bgcolor: '#D35400' } }}
                onClick={() => setActiveStep(2)}
              >
                Add Manually
              </Button>
            </Box>
          </Paper>

          <Box sx={{ 
            p: 2, 
            bgcolor: 'rgba(241, 242, 246, 0.5)', 
            borderRadius: 2,
            mt: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Info size={20} color="#666" />
              <Box>
                <Typography variant="subtitle2">Important Information</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  • Valid prescription should have doctor's details, patient information, and prescription date
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Make sure the prescription is clearly visible and all text is readable
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • You can upload multiple prescriptions if needed
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      label: 'Review Prescription',
      description: 'Check your uploaded prescription before proceeding.',
      content: (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Uploaded Prescriptions ({files.length})
          </Typography>
          
          <MuiGrid container spacing={2}>
            {previewUrls.map((url, index) => (
              <MuiGrid item xs={12} sm={6} md={4} key={index}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    position: 'relative',
                    borderRadius: 2,
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <IconButton 
                    size="small" 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      bgcolor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                    }}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <X size={16} />
                  </IconButton>
                  
                  <Box 
                    sx={{ 
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderRadius: 1
                    }}
                  >
                    {files[index]?.type?.includes('pdf') ? (
                      <FileText size={64} color="#2E86C1" />
                    ) : (
                      <Box 
                        component="img"
                        src={url}
                        alt={`Prescription ${index + 1}`}
                        sx={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    )}
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" noWrap>
                      {files[index]?.name || `File ${index + 1}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {files[index]?.size ? `${(files[index]?.size / 1024).toFixed(1)} KB` : ""}
                    </Typography>
                  </Box>
                </Paper>
              </MuiGrid>
            ))}
            
            <MuiGrid item xs={12} sm={6} md={4}>
              <Paper 
                component="label"
                htmlFor="add-more-prescription"
                elevation={1} 
                sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px dashed #ccc',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)'
                  }
                }}
              >
                <input
                  id="add-more-prescription"
                  type="file"
                  accept="image/*, application/pdf"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <FilePlus size={40} color="#2E86C1" />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Add More
                </Typography>
              </Paper>
            </MuiGrid>
          </MuiGrid>

          <Button 
            variant="contained" 
            color="primary"
            sx={{ mt: 4, mr: 2 }}
            onClick={() => setActiveStep(2)}
          >
            Add Medicines Manually
          </Button>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={handleBack} variant="outlined">
              Back
            </Button>
            <Button onClick={handleNext} variant="contained" color="primary">
              Continue
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      label: 'Add Medicines Manually',
      description: 'Add medicines manually if you don\'t have a prescription.',
      content: (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Add Medicines Manually
          </Typography>
          
          <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <MuiGrid container spacing={2}>
              <MuiGrid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Medicine Name"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="Enter medicine name"
                  required
                  name="medicineName"
                  onBlur={handleMedicineChange}
                />
              </MuiGrid>
              
              <MuiGrid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Dosage (e.g., 500mg)"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="Enter dosage"
                  name="dosage"
                  onBlur={handleMedicineChange}
                />
              </MuiGrid>
              
              <MuiGrid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Quantity (e.g., 10 tablets)"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  name="quantity"
                  onBlur={handleMedicineChange}
                />
              </MuiGrid>
              
              <MuiGrid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="frequency-label">Frequency</InputLabel>
                  <Select
                    labelId="frequency-label"
                    value={frequency}
                    label="Frequency"
                    onChange={(e) => setFrequency(e.target.value)}
                    name="frequency"
                    onBlur={handleMedicineChange}
                  >
                    <MenuItem value="once_daily">Once daily</MenuItem>
                    <MenuItem value="twice_daily">Twice daily</MenuItem>
                    <MenuItem value="thrice_daily">Three times a day</MenuItem>
                    <MenuItem value="four_times">Four times a day</MenuItem>
                    <MenuItem value="as_needed">As needed</MenuItem>
                    <MenuItem value="before_meals">Before meals</MenuItem>
                    <MenuItem value="after_meals">After meals</MenuItem>
                    <MenuItem value="at_bedtime">At bedtime</MenuItem>
                  </Select>
                </FormControl>
              </MuiGrid>
              
              <MuiGrid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddMedicine}
                  disabled={!medicineName.trim()}
                  startIcon={<Plus size={18} />}
                >
                  Add Medicine
                </Button>
              </MuiGrid>
            </MuiGrid>
          </Paper>
          
          {medicines.length > 0 && (
            <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Added Medicines ({medicines.length})
              </Typography>
              
              <List>
                {medicines.map((medicine) => (
                  <ListItem 
                    key={medicine.id}
                    divider
                    sx={{ 
                      py: 2,
                      px: 2,
                      mb: 1,
                      bgcolor: 'rgba(241, 242, 246, 0.5)', 
                      borderRadius: 1
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography fontWeight={500}>
                          {medicine.name} {medicine.dosage && `(${medicine.dosage})`}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          {medicine.quantity && (
                            <Typography variant="body2" component="span" display="block">
                              Quantity: {medicine.quantity}
                            </Typography>
                          )}
                          <Typography variant="body2" component="span" display="block">
                            Frequency: {getFrequencyLabel(medicine.frequency)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        onClick={() => handleRemoveMedicine(medicine.id)}
                        sx={{ color: theme.palette.error.main }}
                      >
                        <X size={18} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {activeStep === 2 && files.length > 0 ? (
              <Button onClick={() => setActiveStep(1)} variant="outlined">
                Back to Prescriptions
              </Button>
            ) : activeStep === 2 ? (
              <Button onClick={() => setActiveStep(0)} variant="outlined">
                Back to Upload
              </Button>
            ) : (
              <Button onClick={handleBack} variant="outlined">
                Back
              </Button>
            )}
            <Button onClick={handleNext} variant="contained" color="primary">
              Continue
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      label: 'Add Details',
      description: 'Add additional details for your order.',
      content: (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Patient & Prescription Details
          </Typography>
          
          <MuiGrid container spacing={3}>
            <MuiGrid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Patient Name"
                variant="outlined"
                name="patientName"
                onBlur={handleMedicineChange}
              />
            </MuiGrid>
            <MuiGrid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Doctor's Name (optional)"
                variant="outlined"
                name="doctorName"
                onBlur={handleMedicineChange}
              />
            </MuiGrid>
            <MuiGrid item xs={12}>
              <TextField
                fullWidth
                label="Additional Instructions (optional)"
                multiline
                rows={4}
                variant="outlined"
                placeholder="Any specific instructions for your order"
                name="instructions"
                onBlur={handleMedicineChange}
              />
            </MuiGrid>
          </MuiGrid>
          
          {medicines.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Medicines to order ({medicines.length})
              </Typography>
              
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <List sx={{ p: 0 }}>
                  {medicines.map((medicine) => (
                    <ListItem 
                      key={medicine.id}
                      divider
                      dense
                      sx={{ py: 1 }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={500}>
                            {medicine.name} {medicine.dosage && `(${medicine.dosage})`}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {medicine.quantity ? `Qty: ${medicine.quantity} • ` : ''} 
                            {getFrequencyLabel(medicine.frequency)}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          )}
          
          {files.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Prescription Files ({files.length})
              </Typography>
              
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <List sx={{ p: 0 }}>
                  {files.map((file, index) => (
                    <ListItem 
                      key={index}
                      divider
                      dense
                      sx={{ py: 1 }}
                    >
                      <ListItemText
                        primary={file.name || `File ${index + 1}`}
                        secondary={file.size ? `${(file.size / 1024).toFixed(1)} KB` : ""}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          )}
          
          <Box sx={{ 
            p: 2, 
            bgcolor: 'rgba(241, 242, 246, 0.5)', 
            borderRadius: 2,
            mt: 4
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info size={20} color="#666" />
              <Typography variant="body2" color="text.secondary">
                Our pharmacist will call you to confirm the medicines and discuss alternatives if needed.
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={handleBack} variant="outlined">
              Back
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/cart"
              disabled={files.length === 0 && medicines.length === 0}
            >
              Submit Prescription
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Upload Prescription
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload your prescription or add medicines manually and we'll deliver them to your doorstep.
      </Typography>

      <MuiGrid container spacing={4}>
        <MuiGrid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>
                    {step.content}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </MuiGrid>
        
        <MuiGrid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Why Upload Prescription?
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <Check size={20} color="#27AE60" />
              <Typography variant="body2">
                Valid prescription ensures you get the right medicine
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <Check size={20} color="#27AE60" />
              <Typography variant="body2">
                Our pharmacists verify your prescription before dispatch
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <Check size={20} color="#27AE60" />
              <Typography variant="body2">
                Legally required for prescription medications
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Check size={20} color="#27AE60" />
              <Typography variant="body2">
                Get appropriate substitutes if required
              </Typography>
            </Box>
          </Paper>
          
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Need Help?
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="body2" paragraph>
              If you're having trouble uploading your prescription, our customer support team is here to help.
            </Typography>
            
            <Button 
              fullWidth 
              variant="outlined" 
              color="primary"
              sx={{ mb: 2 }}
            >
              Call Support
            </Button>
            
            <Button 
              fullWidth 
              variant="text" 
              color="primary"
              component={MuiLink}
              href="/faq"
              sx={{ textDecoration: 'none' }}
            >
              View FAQs
            </Button>
          </Paper>
        </MuiGrid>
      </MuiGrid>
    </Container>
  );
};

export default PrescriptionPage;
