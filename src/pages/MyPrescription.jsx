import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Chip,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Grid
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  CheckCircle,
  AccessTime,
  LocalPharmacy,
  Description,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';


const MyPrescriptionPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [notes, setNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadProgress(0);

    Array.from(files).forEach((file, index) => {
      const fileId = `${Date.now()}-${index}`;
      
      // Validate file
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert(`File ${file.name} is not a valid type. Please upload JPEG, PNG, or PDF files.`);
        return;
      }

      // Create preview for images
      let preview = '';
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      const uploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        preview,
      };

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadedFiles(prev => [...prev, uploadedFile]);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    });
  };

  const removeFile = (fileId) => {
    setUploadedFiles(files => {
      const fileToRemove = files.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return files.filter(f => f.id !== fileId);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one prescription image.');
      return;
    }

    if (!patientName || !contactNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    const prescriptionData = {
      files: uploadedFiles,
      patientInfo: {
        name: patientName,
        age: patientAge,
        gender: patientGender,
        contact: contactNumber,
        email,
        address,
      },
      urgency,
      notes,
      timestamp: new Date().toISOString(),
    };

    console.log('Prescription submitted:', prescriptionData);
    alert('Prescription uploaded successfully! We will contact you shortly.');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Upload Prescription
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload your prescription and we'll prepare your medicines for delivery
      </Typography>

      <Grid container spacing={3}>
        {/* Upload Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Description sx={{ mr: 1, verticalAlign: 'middle' }} />
              Upload Prescription Images
            </Typography>
            
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'primary.main',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                bgcolor: 'primary.50',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'primary.100' },
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
              />
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drop files here or click to upload
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Support: JPEG, PNG, PDF (Max 5MB each)
              </Typography>
            </Box>

            {isUploading && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Uploading... {uploadProgress}%
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Uploaded Files ({uploadedFiles.length})
                </Typography>
                <Grid container spacing={2}>
                  {uploadedFiles.map((file) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={file.id}>
                      <Card sx={{ position: 'relative' }}>
                        {file.preview && (
                          <Box
                            component="img"
                            src={file.preview}
                            alt={file.name}
                            sx={{
                              width: '100%',
                              height: 120,
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="body2" noWrap>
                            {file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(file.size)}
                          </Typography>
                        </CardContent>
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'error.main',
                            color: 'white',
                            '&:hover': { bgcolor: 'error.dark' },
                          }}
                          size="small"
                          onClick={() => removeFile(file.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>

          {/* Patient Information Form */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Patient Information
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Patient Name *"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={patientGender}
                      label="Gender"
                      onChange={(e) => setPatientGender(e.target.value)}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Contact Number *"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Urgency</InputLabel>
                    <Select
                      value={urgency}
                      label="Urgency"
                      onChange={(e) => setUrgency(e.target.value)}
                    >
                      <MenuItem value="normal">Normal (24-48 hours)</MenuItem>
                      <MenuItem value="urgent">Urgent (Same day)</MenuItem>
                      <MenuItem value="emergency">Emergency (2-4 hours)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Additional Notes"
                    multiline
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific instructions or requirements..."
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={uploadedFiles.length === 0 || !patientName || !contactNumber}
                >
                  Submit Prescription
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setUploadedFiles([]);
                    setPatientName('');
                    setPatientAge('');
                    setPatientGender('');
                    setContactNumber('');
                    setEmail('');
                    setAddress('');
                    setNotes('');
                  }}
                >
                  Clear All
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/* Info Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              <LocalPharmacy sx={{ mr: 1, verticalAlign: 'middle' }} />
              How it works
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Upload Prescription"
                  secondary="Upload clear images of your prescription"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTime color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="We Review"
                  secondary="Our pharmacists verify and prepare your order"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Home Delivery"
                  secondary="Get medicines delivered to your doorstep"
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Need Help?
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="body2" fontWeight="bold">Call Us</Typography>
                <Typography variant="body2" color="text.secondary">+91 9876543210</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="body2" fontWeight="bold">Email</Typography>
                <Typography variant="body2" color="text.secondary">support@dawasansaar.com</Typography>
              </Box>
            </Box>
            <Alert severity="info" sx={{ mt: 2 }}>
              Our pharmacists are available 24/7 to help you with your prescription needs.
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyPrescriptionPage;
