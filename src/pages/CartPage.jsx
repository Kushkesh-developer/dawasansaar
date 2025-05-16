import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Grid, Button, Divider, 
  TextField, Box, IconButton, Radio, FormControlLabel,
  Snackbar, Alert
} from '@mui/material';
import { 
  ShoppingBag, Trash2, Plus, Minus, ChevronRight, ChevronLeft, 
  Heart, Tag, CreditCard, Home
} from 'lucide-react';
import ProductCard from '../components/ProductCard/ProductCard';  // Import the ProductCard component
import { 
  initialCartItems, 
  validPromoCodes, 
  banners, 
  suggestedMedicines 
} from '../data/mockcart'; // Import from centralized mock data

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems); // Start with cart items
  const [usePromoCode, setUsePromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [suggestedScrollPosition, setSuggestedScrollPosition] = useState(0);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce((total, item) => total + item.originalPrice * item.quantity, 0);
  const discount = originalTotal - subtotal;
  
  // Apply promo code discount if valid
  const promoDiscount = appliedPromo ? Math.min(subtotal * appliedPromo.discount, 100) : 0;
  
  // Shipping is free if cart is empty or subtotal > 99
  const shippingFee = cartItems.length === 0 || subtotal > 99 ? 0 : 49;
  
  const totalAfterPromo = subtotal - promoDiscount;
  const totalPayable = totalAfterPromo + shippingFee;
  const totalSavings = discount + promoDiscount + (shippingFee === 0 && cartItems.length > 0 ? 49 : 0);

  // Handle quantity updates
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Handle "Continue Shopping" button click
  const handleContinueShopping = () => {
    setSnackbar({
      open: true,
      message: 'Redirecting to homepage...',
      severity: 'info'
    });
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'This would redirect to homepage in a real app',
        severity: 'success'
      });
    }, 1500);
  };

  // Handle promo code application
  const applyPromoCode = () => {
    const foundPromo = validPromoCodes.find(
      p => p.code.toLowerCase() === promoCode.toLowerCase()
    );
    
    if (foundPromo) {
      setAppliedPromo(foundPromo);
      setSnackbar({
        open: true,
        message: `Promo code "${foundPromo.code}" applied successfully! ${foundPromo.description}`,
        severity: 'success'
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Invalid promo code. Please try again.',
        severity: 'error'
      });
    }
  };

  // Remove applied promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setSnackbar({
      open: true,
      message: 'Promo code removed',
      severity: 'info'
    });
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle suggested products carousel navigation
  const handleSuggestedScroll = (direction) => {
    const scrollAmount = 250 * 3; // Scroll 3 cards at a time
    const visibleCards = 3; // Number of cards visible at once
    const maxScroll = Math.max(0, (suggestedMedicines.length - visibleCards) * 250);
    
    if (direction === 'left' && suggestedScrollPosition > 0) {
      setSuggestedScrollPosition(Math.max(0, suggestedScrollPosition - scrollAmount));
    } else if (direction === 'right' && suggestedScrollPosition < maxScroll) {
      setSuggestedScrollPosition(Math.min(maxScroll, suggestedScrollPosition + scrollAmount));
    }
  };

  // Auto sliding banner effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll suggested products
  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setInterval(() => {
        const visibleCards = 3;
        const maxScroll = Math.max(0, (suggestedMedicines.length - visibleCards) * 250);
        setSuggestedScrollPosition((prev) => {
          if (prev >= maxScroll) return 0;
          return Math.min(maxScroll, prev + 250 * 3);
        });
      }, 4000);
      
      return () => clearInterval(timer);
    }
  }, [cartItems.length]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6, px: { xs: 2, sm: 3 } }}>
      <Typography 
        variant="h5" 
        component="h1" 
        fontWeight="bold" 
        mb={3}
        sx={{ borderBottom: '1px solid #e0e0e0', pb: 2 }}
      >
        Order Summary
      </Typography>
      
      <Grid container spacing={3}>
        {/* Left section - Banners and Cart Items */}
        <Grid size={{xs:12,md:8}}>
          {/* Banner Carousel */}
          <Box sx={{ 
            mb: 3, 
            overflow: 'hidden',
            borderRadius: 2,
            height: 120,
            display: 'flex',
            position: 'relative'
          }}>
            {banners.map((banner, index) => (
              <Box 
                key={index}
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: banner.color,
                  color: 'white',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: currentBanner === index ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {banner.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {banner.description}
                </Typography>
                {banner.code && (
                  <Box sx={{ 
                    mt: 1, 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    display: 'inline-block',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1
                  }}>
                    <Typography variant="body2">
                      Code: <strong>{banner.code}</strong>
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          
          {/* Product Listing */}
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                display: 'flex', 
                alignItems: 'center',
                fontWeight: 'bold'
              }}
            >
              <ShoppingBag style={{ marginRight: '8px' }} size={20} />
              PRODUCTS
            </Typography>
            
            {cartItems.length === 0 ? (
              <>
                <Paper elevation={1} sx={{ p: 4, textAlign: 'center', mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>Your cart is empty</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }}
                    onClick={handleContinueShopping}
                    startIcon={<Home size={16} />}
                  >
                    Continue Shopping
                  </Button>
                  
                </Paper>
                
                {/* Suggested Products Carousel */}
                <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      Suggested for You
                    </Typography>
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => handleSuggestedScroll('left')}
                        disabled={suggestedScrollPosition === 0}
                        sx={{ mr: 0.5 }}
                      >
                        <ChevronLeft size={20} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleSuggestedScroll('right')}
                        disabled={suggestedScrollPosition >= (suggestedMedicines.length - 3) * 250}
                      >
                        <ChevronRight size={20} />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        transform: `translateX(-${suggestedScrollPosition}px)`,
                        transition: 'transform 0.3s ease-in-out',
                        gap: 2
                      }}
                    >
                      {suggestedMedicines.map((product) => (
                        <Box key={product.id} sx={{ minWidth: 240, flexShrink: 0 }}>
                          <ProductCard product={product} />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      endIcon={<ChevronRight size={16} />}
                    >
                      View All Medicines
                    </Button>
                  </Box>
                </Paper>
              </>
            ) : (
              cartItems.map((item) => (
                <Paper 
                  key={item.id} 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    mb: 2, 
                    borderRadius: 1,
                    position: 'relative'
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{xs:12,sm:7}}>
                      <Box sx={{ display: 'flex' }}>
                        <Box 
                          sx={{ 
                            width: 60, 
                            height: 60,
                            backgroundColor: '#f9f9f9',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                            mr: 2,
                            border: '1px solid #eaeaea'
                          }}
                        >
                          <Box 
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{ 
                              width: '80%', 
                              height: '80%', 
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
                        
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.manufacturer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                            {item.delivery}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid size={{xs:12,sm:5}}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%'
                      }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" color="error.main">
                            ₹ {item.price}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              sx={{ textDecoration: 'line-through' }}
                            >
                              ₹{item.originalPrice}
                            </Typography>
                            <Typography variant="caption" color="success.main">
                              Save ₹{item.discount}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          border: '1px solid #ddd',
                          borderRadius: 1,
                          alignItems: 'center'
                        }}>
                          <IconButton 
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            sx={{ p: 0.5 }}
                          >
                            <Minus size={16} />
                          </IconButton>
                          
                          <Typography sx={{ mx: 2, fontSize: '0.9rem' }}>
                            QTY: {item.quantity}
                          </Typography>
                          
                          <IconButton 
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            sx={{ p: 0.5 }}
                          >
                            <Plus size={16} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  {/* Remove button positioned absolutely */}
                  <IconButton 
                    size="small"
                    onClick={() => removeItem(item.id)}
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8,
                      color: 'text.secondary'
                    }}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Paper>
              ))
            )}
            
            {cartItems.length > 0 && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Plus size={16} />}
                sx={{ mt: 1 }}
              >
                ADD MORE ITEMS
              </Button>
            )}
            
            {/* Dawasansaar First Banner */}
            {cartItems.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2,
                  border: '1px solid #e91e63',
                  backgroundColor: '#fce4ec',
                  borderRadius: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Tag size={16} color="#e91e63" />
                  <Typography variant="subtitle2" color="#e91e63" fontWeight="bold" sx={{ ml: 1 }}>
                    Dawasansaar FIRST
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    customers get extra <strong>₹6.68</strong> cashback on this order
                  </Typography>
                </Box>
              </Paper>
            )}
            
            {/* Unlimited Free Delivery Banner */}
            {cartItems.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mr: 2
                  }}>
                    <Box component="span" sx={{ fontSize: '1.5rem' }}>🚚</Box>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Unlimited Free Delivery
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      free delivery on orders above ₹99
                    </Typography>
                  </Box>
                </Box>
                
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: '#ff6f00', color: '#ff6f00' }}
                >
                  +ADD
                </Button>
              </Paper>
            )}
            
            {/* Membership Banner */}
            {cartItems.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: '#e91e63',
                  color: 'white',
                  borderRadius: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box component="span" sx={{ fontSize: '1.5rem', mr: 1 }}>👑</Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Membership starting from ₹99 for 3 months
                  </Typography>
                </Box>
              </Paper>
            )}
          </Box>
        </Grid>
        
        {/* Right side - Payment Summary and Suggested Products */}
        <Grid size={{xs:12,md:4}}>          
          {/* Promo Code Section */}
          <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Promo Code (APPLY PROMOCODE / NMS SUPERCASH)
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Radio
                    checked={usePromoCode}
                    onChange={() => setUsePromoCode(true)}
                    value="promoCode"
                    name="radio-buttons"
                    sx={{ color: '#24aeb1', '&.Mui-checked': { color: '#24aeb1' } }}
                  />
                }
                label="Apply Promo Code"
              />
            </Box>
            
            {usePromoCode && (
              <>
                {appliedPromo ? (
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#e8f5e9',
                    p: 1.5,
                    borderRadius: 1,
                    mb: 2
                  }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold" color="success.main">
                        {appliedPromo.code}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {appliedPromo.description}
                      </Typography>
                    </Box>
                    <Button 
                      size="small" 
                      color="error" 
                      variant="outlined"
                      onClick={removePromoCode}
                    >
                      Remove
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      variant="outlined"
                      placeholder="Enter promo code"
                      size="small"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button 
                      variant="contained" 
                      onClick={applyPromoCode}
                      disabled={!promoCode}
                      sx={{ 
                        backgroundColor: '#24aeb1',
                        '&:hover': {
                          backgroundColor: '#1e8e91'
                        }
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                )}
              </>
            )}
            
            <Typography variant="caption" color="text.secondary">
              Get flat discount! Vouchers applicable in payment options.
            </Typography>
          </Paper>
          
          {/* Payment Details */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              PAYMENT DETAILS
            </Typography>
            
            {cartItems.length > 0 ? (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">MRP Total</Typography>
                  <Typography variant="body2">₹ {originalTotal.toFixed(2)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Additional Discount</Typography>
                  <Typography variant="body2" color="error">- ₹ {discount.toFixed(2)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Total Amount</Typography>
                  <Typography variant="body2">₹ {subtotal.toFixed(2)}</Typography>
                </Box>
                
                {appliedPromo && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Promo Discount ({appliedPromo.code})</Typography>
                    <Typography variant="body2" color="error">- ₹ {promoDiscount.toFixed(2)}</Typography>
                  </Box>
                )}
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mb: 1
                }}>
                  <Typography variant="body2">Shipping/Delivery Charges</Typography>
                  <Typography variant="body2">
                    {shippingFee === 0 ? (
                      <Typography component="span" color="success.main">FREE</Typography>
                    ) : (
                      `₹ ${shippingFee.toFixed(2)}`
                    )}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                No items in cart
              </Typography>
            )}
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                Total Payable
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                ₹ {totalPayable.toFixed(2)}
              </Typography>
            </Box>
            
            {cartItems.length > 0 && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  backgroundColor: '#f1f8e9',
                  p: 1,
                  borderRadius: 1,
                  mb: 3
                }}
              >
                <Typography variant="body2" color="success.main">
                  Total Savings
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight="bold">
                  ₹ {totalSavings.toFixed(2)}
                </Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total Payable
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ₹ {totalPayable.toFixed(2)}
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ 
                mt: 2, 
                backgroundColor: '#24aeb1',
                '&:hover': {
                  backgroundColor: '#1e8e91'
                }
              }}
              disabled={cartItems.length === 0}
            >
              {cartItems.length === 0 ? 'NO ITEMS IN CART' : 'PROCEED'}
            </Button>
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Dawasansaar is a technology platform to facilitate transaction of business. The products and services are offered for sale by the sellers. The user authorizes the delivery personnel to be his agent for delivery of the goods. For details read Terms & Conditions
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={5000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CartPage;