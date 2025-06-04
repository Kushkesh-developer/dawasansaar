import React, { useState, useEffect } from "react";
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

const ProductDescriptionPage = ({ productId = 2 }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://ruby-dawasansar.onrender.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProductData(data);
      } catch (err) {
        setError(err.message);
        // Fallback data if API fails
        setProductData({
          data: {
            id: "2",
            type: "product",
            attributes: {
              id: 2,
              name: "headach tablet",
              description: "450 mg tablet",
              price: 100,
              category: "Tablet",
              images: [
                "https://ruby-dawasansar.onrender.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NiwicHVyIjoiYmxvYl9pZCJ9fQ==--6448fb1d9c1f0dd7ba3b2077995f614e44efdad3/Home2Product1.png",
                "https://ruby-dawasansar.onrender.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6NywicHVyIjoiYmxvYl9pZCJ9fQ==--e6569c7ed185168dd2f01a772b89916202df02d2/Home2Product2.png"
              ]
            }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Loading product...</Typography>
      </Box>
    );
  }

  if (!productData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography color="error">Failed to load product data</Typography>
      </Box>
    );
  }

  // Product data with API integration and static fallbacks
  const product = {
    id: productData.data.attributes.id,
    name: productData.data.attributes.name || "Product Name",
    brand: "Generic Pharma", // Static fallback
    category: productData.data.attributes.category || "Medicine",
    mrp: Math.round((productData.data.attributes.price || 100) * 1.25), // Calculate MRP as 25% higher
    salePrice: productData.data.attributes.price || 100,
    discount: 20, // Static fallback
    rating: 4.2, // Static fallback
    ratingCount: 89, // Static fallback
    inStock: true, // Static fallback
    fastDelivery: true, // Static fallback
    prescription: false, // Static fallback
    images: (productData.data.attributes.images && productData.data.attributes.images.length > 0) 
      ? productData.data.attributes.images 
      : [
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center",
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center"
        ],
    keyIngredients: [ // Static fallback
      "Active Pharmaceutical Ingredient",
      "Excipients", 
      "Binding agents",
      "Disintegrants",
      "Coating materials"
    ],
    benefits: [ // Static fallback based on category
      productData.data.attributes.category === "Tablet" ? "Fast-acting relief" : "Effective treatment",
      "Clinically tested formula",
      "Safe and reliable",
      "Easy to use",
      "Quality assured"
    ],
    description: productData.data.attributes.description || "This is a high-quality pharmaceutical product designed for effective treatment.",
    directions: "Take as directed by healthcare professional. Follow prescribed dosage.", // Static fallback
    storage: "Store in a cool, dry place away from direct sunlight. Keep out of reach of children." // Static fallback
  };

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
      {/* Simple Navbar */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mb: 3 }}>
        <Typography variant="h5" component="h1">
          DawaSansar - Online Pharmacy
        </Typography>
      </Box>
      
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            API Error: {error} - Showing fallback data
          </Alert>
        )}
        
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={5}>
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
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center";
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
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center";
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={7}>
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
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalShipping sx={{ color: "#27AE60" }} />
                      <Typography variant="body2">Free Delivery</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Security sx={{ color: "#27AE60" }} />
                      <Typography variant="body2">100% Genuine</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime sx={{ color: "#27AE60" }} />
                      <Typography variant="body2">24h Delivery</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
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
          <Grid item xs={12}>
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
                    <strong>Category:</strong> {product.category}
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
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => {
                        const rating = prompt("Rate this product (1-5):");
                        const review = prompt("Write your review:");
                        if (rating && review) {
                          handleSubmitReview({
                            rating: parseInt(rating),
                            review: review,
                            timestamp: Date.now()
                          });
                        }
                      }}
                    >
                      Write Review
                    </Button>
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
                      : "Thank you for your reviews!"
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