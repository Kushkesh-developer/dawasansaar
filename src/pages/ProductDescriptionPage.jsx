import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Divider,
  Card,
  CardContent,
  IconButton,
  Badge,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  EmojiEvents,
  AccessTime,
  CheckCircle,
  Star,
  Remove,
  Add,
} from "@mui/icons-material";
import Navbar from "../components/Navbar/Navbar";
import ReviewForm from "../components/ReviewForm";

const ProductDescriptionPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  // Mock product data based on Netmeds example
  const product = {
    id: 1,
    name: "Bayer Supradyn Immuno Tablet Turmeric Tulsi 30s",
    brand: "Bayer",
    category: "Immunity Booster",
    mrp: 525,
    salePrice: 446,
    discount: 15,
    rating: 4.3,
    ratingCount: 127,
    inStock: true,
    fastDelivery: true,
    prescription: false,
    images: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop&crop=center",
      ],
    keyIngredients: [
      "Turmeric Extract",
      "Tulsi Extract", 
      "Vitamin C",
      "Vitamin D3",
      "Zinc",
      "Selenium"
    ],
    benefits: [
      "Boosts immunity naturally",
      "Rich in antioxidants",
      "Supports respiratory health",
      "Enhances energy levels",
      "Helps fight infections"
    ],
    description: "Bayer Supradyn Immuno is a comprehensive immunity booster that combines the power of traditional herbs like Turmeric and Tulsi with essential vitamins and minerals. This scientifically formulated supplement helps strengthen your body's natural defense system.",
    directions: "Take 1 tablet daily with water, preferably after meals or as directed by healthcare professional.",
    storage: "Store in a cool, dry place away from direct sunlight. Keep out of reach of children."
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", { product: product.id, quantity });
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    console.log("Buy now:", { product: product.id, quantity });
    alert("Redirecting to checkout...");
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleSubmitReview = (reviewData) => {
    console.log("Review submitted:", reviewData);
    setUserReviews(prev => [...prev, { ...reviewData, id: Date.now() }]);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid size={{xs:12,md:5}}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ mb: 2, position: "relative" }}>
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: 400,
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                {product.discount > 0 && (
                  <Chip
                    label={`${product.discount}% OFF`}
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      fontWeight: 700,
                    }}
                  />
                )}
              </Box>
              
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    sx={{
                      width: 60,
                      height: 60,
                      border: currentImageIndex === index ? 2 : 1,
                      borderColor: currentImageIndex === index ? "primary.main" : "grey.300",
                      borderRadius: 1,
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid size={{xs:12,md:7}}>
            <Box>
              <Typography variant="h5" component="h1" gutterBottom fontWeight={600}>
                {product.name}
              </Typography>
              
              <Typography variant="subtitle1" color="primary" gutterBottom>
                By {product.brand}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={product.rating} readOnly precision={0.1} size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {product.rating} ({product.ratingCount} reviews)
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Typography variant="h4" component="span" fontWeight={700} color="primary">
                  ₹{product.salePrice}
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ textDecoration: "line-through" }}
                  color="text.secondary"
                >
                  ₹{product.mrp}
                </Typography>
                <Chip label={`${product.discount}% OFF`} color="success" size="small" />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Inclusive of all taxes
              </Typography>

              {/* Quantity and Actions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Quantity:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", border: 1, borderColor: "grey.300", borderRadius: 1 }}>
                    <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                      <Remove />
                    </IconButton>
                    <Typography sx={{ px: 2, minWidth: 40, textAlign: "center" }}>
                      {quantity}
                    </Typography>
                    <IconButton onClick={() => handleQuantityChange(1)}>
                      <Add />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={handleAddToCart}
                    sx={{ flex: 1 }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleBuyNow}
                    sx={{ flex: 1 }}
                  >
                    Buy Now
                  </Button>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={handleWishlist} color={isWishlisted ? "error" : "default"}>
                    {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton>
                    <Share />
                  </IconButton>
                </Box>
              </Box>

              {/* Features */}
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={{xs:6}}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalShipping sx={{ color: "#27AE60" }} />
                      <Typography variant="body2">Free Delivery</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{xs:6}}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Security sx={{ color: "#27AE60" }} />
                      <Typography variant="body2">100% Genuine</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{xs:6}}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime sx={{ color: "#27AE60" }} />
                      <Typography variant="body2">24h Delivery</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{xs:6}}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmojiEvents sx={{ color: "#27AE60" }} />
                      <Typography variant="body2">FDA Approved</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {product.inStock ? (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircle fontSize="small" />
                    In Stock - Ready to ship
                  </Box>
                </Alert>
              ) : (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Out of Stock
                </Alert>
              )}
            </Box>
          </Grid>

          {/* Product Information Tabs */}
          <Grid size={{xs:12}}>
            <Paper sx={{ mt: 4 }}>
              <Tabs
                value={selectedTab}
                onChange={(e, newValue) => setSelectedTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Description" />
                <Tab label="Key Ingredients" />
                <Tab label="Benefits" />
                <Tab label="Directions" />
                <Tab label="Reviews" />
              </Tabs>

              <TabPanel value={selectedTab} index={0}>
                <Box sx={{ px: 3, pb: 2 }}>
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Storage:</strong> {product.storage}
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={selectedTab} index={1}>
                <Box sx={{ px: 3, pb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Key Ingredients:
                  </Typography>
                  <List>
                    {product.keyIngredients.map((ingredient, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: "#27AE60" }} />
                        </ListItemIcon>
                        <ListItemText primary={ingredient} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </TabPanel>

              <TabPanel value={selectedTab} index={2}>
                <Box sx={{ px: 3, pb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Health Benefits:
                  </Typography>
                  <List>
                    {product.benefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Star sx={{ color: "#27AE60" }} />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </TabPanel>

              <TabPanel value={selectedTab} index={3}>
                <Box sx={{ px: 3, pb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Directions for Use:
                  </Typography>
                  <Typography variant="body1">{product.directions}</Typography>
                </Box>
              </TabPanel>

              <TabPanel value={selectedTab} index={4}>
                <Box sx={{ px: 3, pb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6">
                      Customer Reviews ({product.ratingCount + userReviews.length})
                    </Typography>
                    <ReviewForm 
                      productName={product.name}
                      onSubmitReview={handleSubmitReview}
                    />
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Rating value={product.rating} readOnly precision={0.1} />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {product.rating} out of 5
                    </Typography>
                  </Box>

                  {userReviews.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Recent Reviews:
                      </Typography>
                      {userReviews.map((review) => (
                        <Card key={review.id} sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <Rating value={review.rating} readOnly size="small" />
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {new Date(review.timestamp).toLocaleDateString()}
                              </Typography>
                            </Box>
                            {review.title && (
                              <Typography variant="subtitle2" gutterBottom>
                                {review.title}
                              </Typography>
                            )}
                            <Typography variant="body2">
                              {review.review}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  )}

                  <Typography variant="body2" color="text.secondary">
                    {userReviews.length === 0 
                      ? "Be the first to review this product!" 
                      : "More reviews will be displayed here when integrated with the backend API."
                    }
                  </Typography>
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDescriptionPage;