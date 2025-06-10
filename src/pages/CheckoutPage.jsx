import React, { useState } from 'react';
import { Container, Box, Stepper, Step, StepLabel, Paper } from '@mui/material';
import AddressSelection from '../components/Checkout/AdressSelection';
import PaymentMethods from '../components/Checkout/Payment';
import OrderReview from '../components/checkout/OrderReview';

const steps = ['Your Cart', 'Order Review'];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };    

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>x
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Left Side - Address and Payment */}
          <Box sx={{ flex: 1 }}>
            <AddressSelection 
              selectedAddress={selectedAddress}
              onAddressSelect={setSelectedAddress}
            />
            
            <PaymentMethods 
              selectedMethod={selectedPaymentMethod}
              onMethodSelect={setSelectedPaymentMethod}
            />
          </Box>

          {/* Right Side - Order Review */}
          <Box sx={{ width: 400 }}>
            <OrderReview 
              selectedAddress={selectedAddress}
              selectedPaymentMethod={selectedPaymentMethod}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;