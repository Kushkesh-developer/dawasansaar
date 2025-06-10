import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel,
  Divider,
  Chip
} from '@mui/material';
import { CreditCard, Smartphone, Banknote, Wallet } from 'lucide-react';



const PaymentMethods = ({ selectedMethod, onMethodSelect }) => {
  const paymentMethods = [
    {
      id: 'upi',
      title: 'UPI',
      subtitle: 'Pay using UPI ID or QR Code',
      icon: <Smartphone size={24} />,
      options: ['PhonePe', 'Google Pay', 'Paytm', 'BHIM UPI', 'Other UPI Apps']
    },
    {
      id: 'cards',
      title: 'Credit/Debit Cards',
      subtitle: 'Visa, Mastercard, RuPay, American Express',
      icon: <CreditCard size={24} />,
      options: ['Add New Card', 'Saved Cards']
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      subtitle: 'All major banks supported',
      icon: <Banknote size={24} />,
      options: ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Other Banks']
    },
    {
      id: 'wallets',
      title: 'Wallets',
      subtitle: 'Paytm, PhonePe, Amazon Pay',
      icon: <Wallet size={24} />,
      options: ['Paytm Wallet', 'PhonePe Wallet', 'Amazon Pay', 'Mobikwik']
    },
    {
      id: 'cod',
      title: 'Cash on Delivery',
      subtitle: 'Pay when you receive',
      icon: <Banknote size={24} />,
      options: []
    }
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
        PAYMENT METHODS
      </Typography>

      <RadioGroup value={selectedMethod} onChange={(e) => onMethodSelect(e.target.value)}>
        {paymentMethods.map((method, index) => (
          <Box key={method.id}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                border: selectedMethod === method.id ? '2px solid #2E86C1' : '1px solid #e0e0e0',
                backgroundColor: selectedMethod === method.id ? '#f8f9ff' : 'transparent'
              }}
            >
              <FormControlLabel
                value={method.id}
                control={<Radio sx={{ color: '#2E86C1', '&.Mui-checked': { color: '#2E86C1' } }} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ color: '#2E86C1', mr: 2 }}>
                      {method.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="600">
                        {method.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.subtitle}
                      </Typography>
                      {selectedMethod === method.id && method.options.length > 0 && (
                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {method.options.map((option) => (
                            <Chip 
                              key={option}
                              label={option}
                              variant="outlined"
                              size="small"
                              sx={{ 
                                borderColor: '#2E86C1',
                                color: '#2E86C1',
                                '&:hover': { backgroundColor: '#f0f7ff' }
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                }
                sx={{ m: 0, width: '100%' }}
              />
            </Paper>
            {index < paymentMethods.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </RadioGroup>

      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          🔒 Your payment information is encrypted and secure. 
          Powered by Razorpay - India's most trusted payment gateway.
        </Typography>
      </Box>
    </Paper>
  );
};

export default PaymentMethods;