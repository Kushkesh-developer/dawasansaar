
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const WishlistPage = () => {
  const [loading, setLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  // API integration point - Fetch wishlist items
  const fetchWishlistItems = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/wishlist', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const data = await response.json();
      // setWishlistItems(data);
      
      // Mock data for now
      setWishlistItems([]);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  // API integration point - Remove item from wishlist
  const removeFromWishlist = async (itemId) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/wishlist/${itemId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      
      setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  // API integration point - Add to cart
  const addToCart = async (itemId) => {
    try {
      // TODO: Replace with actual API call
      // await fetch('/api/cart', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ itemId, quantity: 1 })
      // });
      
      console.log('Added to cart:', itemId);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  return (
    <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        My Wishlist
      </Typography>
      
      {wishlistItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Heart size={64} color="#ccc" />
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Start adding items to your wishlist!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {wishlistItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart size={16} />}
                      onClick={() => addToCart(item.id)}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default WishlistPage;
