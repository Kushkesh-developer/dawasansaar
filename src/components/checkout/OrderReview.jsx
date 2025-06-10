
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Button,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';


const OrderReview = ({ selectedAddress, selectedPaymentMethod }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  const demoProduct = {
    name: "Dr. Morepen Omega 3 Deep Sea Fish Oil Triple Strength Capsule 60's",
    image: "/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png",
    price: 648.41,
    originalPrice: 1099.00,
    quantity: 1,
    seller: "RELIANCE RETAIL LIMITED [NOIDA-2FC]",
    expiry: "Nov 2026"
  };
  
  const pricing = {
    mrpTotal: 1099.00,
    additionalDiscount: 450.59,
    totalAmount: 648.41,
    shippingCharges: 0.00,
    totalPayable: 648.41,
    totalSavings: 450.59
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      'upi': 'UPI',
      'cards': 'Credit/Debit Card',
      'netbanking': 'Net Banking',
      'wallets': 'Wallet',
      'cod': 'Cash on Delivery'
    };
    return methods[method] || 'Select Payment Method';
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      setIsProcessing(false);
      return;
    }

    // Demo Razorpay options
    const options = {
      key: 'rzp_test_demo', // Demo key
      amount: Math.round(pricing.totalPayable * 100), // Amount in paise
      currency: 'INR',
      name: 'Dawa Sansaar',
      description: 'Medicine Order Payment',
      image: '/lovable-uploads/85a6db16-0aaa-40ae-9b54-e71c0c0bb8e4.png',
      order_id: 'order_demo_' + Date.now(), // Demo order ID
      handler: function (response) {
        console.log('Payment Success:', response);
        setPaymentStatus('success');
        setIsProcessing(false);
        
        // Show success message
        setTimeout(() => {
          alert(`Payment Successful! 
Payment ID: ${response.razorpay_payment_id}
Order placed successfully!`);
        }, 500);
      },
      prefill: {
        name: selectedAddress?.name || 'Customer',
        email: 'customer@example.com',
        contact: selectedAddress?.phone || '+91 9999999999'
      },
      notes: {
        address: selectedAddress?.address || 'Demo Address'
      },
      theme: {
        color: '#2E86C1'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          console.log('Payment modal closed');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    
    razorpay.on('payment.failed', function (response) {
      console.log('Payment Failed:', response.error);
      setPaymentStatus('failed');
      setIsProcessing(false);
      alert(`Payment Failed: ${response.error.description}`);
    });
    
    razorpay.open();
  };

  const handlePayment = () => {
    if (!selectedAddress || !selectedPaymentMethod) {
      alert('Please select address and payment method');
      return;
    }

    console.log('Processing payment...', {
      address: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      amount: pricing.totalPayable
    });
    
    if (selectedPaymentMethod === 'cod') {
      setPaymentStatus('success');
      alert('Order placed successfully! Pay ₹' + pricing.totalPayable + ' on delivery.');
    } else {
      // Use Razorpay for all other payment methods
      handleRazorpayPayment();
    }
  };

  return (
    <Paper sx={{ p: 3, height: 'fit-content', position: 'sticky', top: 20 }}>
      <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
        PAYMENT DETAILS
      </Typography>

      {paymentStatus === 'success' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Payment successful! Your order has been placed.
        </Alert>
      )}

      {paymentStatus === 'failed' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Payment failed. Please try again.
        </Alert>
      )}

      {/* Product Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          PRODUCTS
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <img 
            src={demoProduct.image} 
            alt={demoProduct.name}
            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              {demoProduct.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Qty: {demoProduct.quantity}
            </Typography>
            <Typography variant="body2" sx={{ color: '#e91e63', fontWeight: 600 }}>
              ₹{demoProduct.price}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" color="text.secondary">
          Delivery Estimate: 12-June-2025
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Pricing Details */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">MRP Total</Typography>
          <Typography variant="body2">₹ {pricing.mrpTotal}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Additional Discount</Typography>
          <Typography variant="body2" sx={{ color: 'green' }}>- ₹ {pricing.additionalDiscount}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Total Amount</Typography>
          <Typography variant="body2">₹ {pricing.totalAmount}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2">Shipping Charges</Typography>
          <Typography variant="body2" sx={{ color: 'green' }}>₹ {pricing.shippingCharges}</Typography>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
          <Typography variant="h6" sx={{ color: '#00bcd4' }}>Total Payable</Typography>
          <Typography variant="h6" sx={{ color: '#00bcd4' }}>₹ {pricing.totalPayable}</Typography>
        </Box>

        <Chip 
          label={`Total Savings ₹ ${pricing.totalSavings}`}
          sx={{ 
            backgroundColor: '#4caf50', 
            color: 'white', 
            fontSize: '0.75rem',
            mb: 2
          }}
        />
      </Box>

      {/* Selected Address & Payment Method */}
      {selectedAddress && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            DELIVERY ADDRESS
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            {selectedAddress.name}<br/>
            {selectedAddress.address}<br/>
            {selectedAddress.city} - {selectedAddress.pincode}, {selectedAddress.state}
          </Typography>
        </Box>
      )}

      {selectedPaymentMethod && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            PAYMENT METHOD
          </Typography>
          <Typography variant="body2">
            {getPaymentMethodName(selectedPaymentMethod)}
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handlePayment}
        disabled={!selectedAddress || !selectedPaymentMethod || isProcessing || paymentStatus === 'success'}
        sx={{
          backgroundColor: '#00bcd4',
          color: 'white',
          fontWeight: 600,
          py: 1.5,
          '&:hover': {
            backgroundColor: '#00acc1'
          },
          '&:disabled': {
            backgroundColor: '#e0e0e0'
          }
        }}
      >
        {isProcessing ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            Processing...
          </Box>
        ) : paymentStatus === 'success' ? (
          'ORDER PLACED'
        ) : (
          'PAY'
        )}
      </Button>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
        Netmeds is a technology platform to facilitate transaction of business. 
        The products and services are offered for sale by the sellers.
      </Typography>
    </Paper>
  );
};

export default OrderReview;