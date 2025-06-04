// AccountInformationPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BannerCards from '../components/BannerCards';
import AccountInformation from '../components/AccountInformation';

const AccountInformationPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);

  // API integration - Fetch account information
  const fetchAccountInformation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting API call...');
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.log('Available localStorage keys:', Object.keys(localStorage));
        throw new Error('No authentication token found');
      }

      console.log('Token found:', token.substring(0, 20) + '...');

      // Extract user ID from token or use hardcoded ID for testing
      let userId = user?.id || user?.attributes?.id;
      
      // If still no userId, try to extract from token
      if (!userId) {
        console.log('User object:', user);
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.account_id;
          console.log('Extracted userId from token:', userId);
        } catch (e) {
          console.log('Could not decode token, using fallback userId: 6');
          userId = 6; // Your account ID from the token
        }
      }
      
      if (!userId) {
        throw new Error('User ID not found');
      }

      console.log('Making API call with userId:', userId);

      const response = await fetch(`https://ruby-dawasansar.onrender.com/accounts/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('API Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const apiData = await response.json();
      console.log('API Data received:', apiData);
      
      // Transform API response to match your component's expected format
      const transformedData = {
        id: apiData.data.attributes.id,
        name: `${apiData.data.attributes.first_name || ''} ${apiData.data.attributes.last_name || ''}`.trim(),
        email: apiData.data.attributes.email || 'No email',
        phone: apiData.data.attributes.phone_number ? apiData.data.attributes.phone_number.toString() : 'No phone number',
        gender: apiData.data.attributes.gender || 'No data',
        role: apiData.data.attributes.role || 'User',
        address: apiData.data.attributes.address || 'No address',
        created_at: apiData.data.attributes.created_at,
        updated_at: apiData.data.attributes.updated_at
      };
      
      console.log('Transformed data:', transformedData);
      setAccountData(transformedData);
      
    } catch (error) {
      console.error('Failed to fetch account information:', error);
      setError(error.message);
      
      // Enhanced fallback to user data from context if API fails
      if (user) {
        console.log('Using fallback user data:', user);
        
        let fallbackData;
        
        if (user.attributes) {
          fallbackData = {
            id: user.attributes.id || user.id,
            name: user.attributes.first_name && user.attributes.last_name 
              ? `${user.attributes.first_name} ${user.attributes.last_name}`.trim()
              : user.name || 'No name',
            email: user.attributes.email || user.email || 'No email',
            phone: user.attributes.phone_number 
              ? user.attributes.phone_number.toString() 
              : user.phone || 'No phone number',
            gender: user.attributes.gender || user.gender || 'No data',
            role: user.attributes.role || user.role || 'User',
          };
        } else {
          fallbackData = {
            id: user.id,
            name: user.first_name && user.last_name 
              ? `${user.first_name} ${user.last_name}`.trim()
              : user.name || 'No name',
            email: user.email || 'No email',
            phone: user.phone_number 
              ? user.phone_number.toString() 
              : user.phone || 'No phone number',
            gender: user.gender || 'No data',
            role: user.role || 'User',
          };
        }
        
        console.log('Fallback data created:', fallbackData);
        setAccountData(fallbackData);
      } else {
        console.log('No user data available for fallback');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountInformation();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        fontSize: '16px'
      }}>
        Loading account information...
      </div>
    );
  }

  if (error && !accountData) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        color: '#d32f2f'
      }}>
        <div>Error loading account information: {error}</div>
        <button 
          onClick={fetchAccountInformation}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#2E86C1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <BannerCards />
      <AccountInformation 
        user={accountData || user} 
        loading={loading}
        error={error}
        onRetry={fetchAccountInformation}
      />
      {error && accountData && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fff3cd', 
          color: '#856404',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          margin: '10px 0'
        }}>
          Warning: Using cached data due to API error: {error}
        </div>
      )}
    </>
  );
};

export default AccountInformationPage;