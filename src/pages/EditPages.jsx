import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    email: '',
    mobileNumber: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Role mapping helper function
  const getRoleValue = (roleString) => {
    const roleMapping = {
      'Customer': 0,  // user
      'Vendor': 1,    // vendor
      'Admin': 2,     // inventory/admin
      'Inventory': 2  // alternative name for admin
    };
    
    return roleMapping[roleString] !== undefined ? roleMapping[roleString] : 0; // default to user (0)
  };

  // Use your actual auth token
  const getAuthToken = () => {
    // Your provided token
    const yourToken = "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50X2lkIjo2LCJleHAiOjE3NDg5NDgzMzN9.Zj9myO5T6dCuQHbCRD2kkG93Kj_kScixDYVdU32VjNw";
    
    // Try to get from localStorage first, fallback to your token
    return localStorage.getItem('authToken') || yourToken;
  };

  // Enhanced API response handler with better debugging
  const handleApiResponse = async (response) => {
    console.log('=== API Response Debug ===');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('URL:', response.url);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    // Get the response text first
    const responseText = await response.text();
    console.log('Raw Response Text:', responseText);
    
    if (!response.ok) {
      console.error('Response not OK:', response.status);
      
      if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication failed. Token may be expired.');
      } else if (response.status === 404) {
        throw new Error('User account not found. Please check the account ID.');
      } else if (response.status === 422) {
        throw new Error('Invalid data provided. Please check your input.');
      } else if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(`Request failed: ${response.status} - ${response.statusText}`);
      }
    }
    
    // Handle empty response
    if (!responseText.trim()) {
      console.log('Empty response, assuming success');
      return { success: true, message: 'Operation completed successfully' };
    }
    
    // Try to parse JSON
    try {
      const jsonData = JSON.parse(responseText);
      console.log('Parsed JSON:', jsonData);
      return jsonData;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      // If response is successful but not JSON, return success
      if (response.ok) {
        return { success: true, message: 'Operation completed successfully', rawResponse: responseText };
      }
      throw new Error('Invalid response format from server');
    }
  };

  // Get user ID from token (account_id is 6 based on your token)
  const getUserId = () => {
    try {
      const token = getAuthToken();
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
      return payload.account_id || payload.user_id || user?.id || '6';
    } catch (error) {
      console.error('Error parsing token:', error);
      return user?.id || '6'; // Fallback to 6 from your token
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const token = getAuthToken();
        const userId = getUserId();
        
        console.log('=== Fetching User Data ===');
        console.log('User ID:', userId);
        console.log('Token:', token.substring(0, 20) + '...');
        console.log('API URL:', `https://ruby-dawasansar.onrender.com/accounts/${userId}`);
        
        const response = await fetch(`https://ruby-dawasansar.onrender.com/accounts/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        const result = await handleApiResponse(response);
        console.log('Fetch Result:', result);
        
        // Handle different response structures
        let userData = {};
        
        if (result.data && result.data.attributes) {
          // JSON:API format
          const attrs = result.data.attributes;
          userData = {
            firstName: attrs.first_name || '',
            lastName: attrs.last_name || '',
            gender: attrs.gender || '', 
            age: attrs.age ? attrs.age.toString() : '',
            email: attrs.email || '',
            mobileNumber: attrs.phone_number ? attrs.phone_number.toString().replace(/^\+?91/, '') : '',
            role: attrs.role || '',
          };
        } else if (result.data) {
          // Nested data format
          userData = {
            firstName: result.data.first_name || '',
            lastName: result.data.last_name || '',
            gender: result.data.gender || '',
            age: result.data.age ? result.data.age.toString() : '',
            email: result.data.email || '',
            mobileNumber: result.data.phone_number ? result.data.phone_number.toString().replace(/^\+?91/, '') : '',
            role: result.data.role || '',
          };
        } else {
          // Direct format
          userData = {
            firstName: result.first_name || '',
            lastName: result.last_name || '',
            gender: result.gender || '',
            age: result.age ? result.age.toString() : '',
            email: result.email || '',
            mobileNumber: result.phone_number ? result.phone_number.toString().replace(/^\+?91/, '') : '',
            role: result.role || '',
          };
        }
        
        console.log('Processed user data:', userData);
        setFormData(userData);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(`Failed to load profile: ${error.message}`);
        
        // Set some default data for testing
        setFormData({
        //   firstName: 'John',
        //   lastName: 'Doe',
        //   gender: '',
        //   age: '',
        //   email: 'john.doe@example.com',
        //   mobileNumber: '',
        //   role: 'Customer',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Validate required fields
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
        throw new Error('First name, last name, and email are required.');
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address.');
      }
      
      // Validate mobile number if provided
      if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
        throw new Error('Please enter a valid 10-digit mobile number.');
      }
      
      const token = getAuthToken();
      const userId = getUserId();
      
      // Prepare update data - with proper role mapping
      const updateData = {
        account: {
          "first_name": formData.firstName.trim(),
          "last_name": formData.lastName.trim(),
          "email": formData.email.trim(),
          "phone_number": formData.mobileNumber?.trim() || '',
          "password": "password1234567",
          "password_confirmation": "password1234567",
          "gender": formData.gender?.trim() || '',
          "age": formData.age ? parseInt(formData.age) : null,
          "role": getRoleValue(formData.role), // Use the helper function
        }
      };

      console.log('=== Updating Profile ===');
      console.log('User ID:', userId);
      console.log('Token:', token.substring(0, 20) + '...');
      console.log('Role String:', formData.role, '-> Role Value:', getRoleValue(formData.role));
      console.log('Update Data:', updateData);
      console.log('API URL:', `https://ruby-dawasansar.onrender.com/accounts/${userId}`);

      const response = await fetch(`https://ruby-dawasansar.onrender.com/accounts/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result = await handleApiResponse(response);
      console.log('Update Result:', result);
      
      // Update local context if function exists
      if (updateProfile && typeof updateProfile === 'function') {
        const updatedUserData = {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.mobileNumber ? `+91-${formData.mobileNumber}` : '',
          gender: formData.gender,
          age: formData.age,
          role: formData.role,
        };
        
        try {
          await updateProfile(updatedUserData);
        } catch (contextError) {
          console.warn('Failed to update auth context:', contextError);
        }
      }
      
      setSuccess('Profile updated successfully!');
      
      // Navigate back after showing success message
      setTimeout(() => {
        navigate('/profile/account');
      }, 2000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/profile/account');
  };

  return (
    <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowLeft size={24} />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Edit Profile
        </Typography>
      </Box>

      {/* Debug Info */}
      <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" display="block">
          <strong>Debug Info:</strong> User ID: {getUserId()}, Token: ...{getAuthToken().slice(-10)}
        </Typography>
      </Box>

      {/* Error/Success Messages */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {/* Form */}
      <Box component="form" sx={{ maxWidth: 600 }}>
        <Grid container spacing={3}>
          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 500 }}>
              FIRST NAME *
            </Typography>
            <TextField
              fullWidth
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              placeholder="Enter first name"
              disabled={loading}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ddd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2E86C1',
                  },
                },
              }}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 500 }}>
              LAST NAME *
            </Typography>
            <TextField
              fullWidth
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              placeholder="Enter last name"
              disabled={loading}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ddd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2E86C1',
                  },
                },
              }}
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 500 }}>
              ROLE
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.role}
                onChange={handleInputChange('role')}
                displayEmpty
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#f5f5f5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ddd',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2E86C1',
                  },
                }}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 500 }}>
              GENDER
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.gender}
                onChange={handleInputChange('gender')}
                displayEmpty
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#f5f5f5',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#ddd',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2E86C1',
                  },
                }}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Age */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 500 }}>
              AGE
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={formData.age}
              onChange={handleInputChange('age')}
              placeholder="Enter age"
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Calendar size={20} color="#999" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f5f5f5',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ddd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2E86C1',
                  },
                },
              }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 500 }}>
              EMAIL *
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="Enter email address"
                disabled={loading}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5',
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ddd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2E86C1',
                    },
                  },
                }}
              />
              <Button
                variant="outlined"
                sx={{
                  color: '#e91e63',
                  borderColor: '#e91e63',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#e91e63',
                    backgroundColor: 'rgba(233, 30, 99, 0.04)',
                  },
                }}
              >
                VERIFY
              </Button>
            </Box>
          </Grid>

          {/* Mobile Number */}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 500 }}>
              MOBILE NUMBER
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                value="+91"
                disabled
                sx={{
                  width: 80,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5',
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                value={formData.mobileNumber}
                onChange={handleInputChange('mobileNumber')}
                placeholder="Enter mobile number"
                disabled={loading}
                inputProps={{ maxLength: 10 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5',
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ddd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2E86C1',
                    },
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box sx={{ mt: 6 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveChanges}
            disabled={loading}
            sx={{
              backgroundColor: '#4DB6AC',
              color: 'white',
              py: 2,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: '#26A69A',
              },
              '&:disabled': {
                backgroundColor: '#ccc',
              },
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EditProfilePage;