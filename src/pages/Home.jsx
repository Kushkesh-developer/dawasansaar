import React, { useState, useEffect } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import Footer from "../components/Footer";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://ruby-dawasansar.onrender.com/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Transform the API data to match your component's expected format
        const transformedProducts = result.data.map(item => ({
          id: item.attributes.id,
          name: item.attributes.name,
          description: item.attributes.description,
          price: item.attributes.price,
          category: item.attributes.category,
          images: item.attributes.images,
          // Add any additional fields your ProductCard component expects
          image: item.attributes.images[0], // Use first image as main image
        }));
        
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // You can create different categories or filters for different carousels
  const getDiscountProducts = () => {
    // Create "discount" products based on different criteria
    const discountProducts = products.map(product => {
      let hasDiscount = false;
      let discountPercentage = 0;
      let discountedPrice = product.price;
      let originalPrice = product.price;
      
      // Apply discount logic based on different criteria:
      
      // 1. Products with price ending in 0 or 5 (promotional pricing)
      if (product.price % 10 === 0 || product.price % 10 === 5) {
        hasDiscount = true;
        discountPercentage = 10;
      }
      
      // 2. Products with price above 200 get 15% discount
      else if (product.price > 200) {
        hasDiscount = true;
        discountPercentage = 15;
      }
      
      // 3. Specific categories get discount
      else if (product.category && product.category.toLowerCase().includes('tablet')) {
        hasDiscount = true;
        discountPercentage = 8;
      }
      
      // 4. Products with longer names (more detailed) get discount
      else if (product.name && product.name.length > 15) {
        hasDiscount = true;
        discountPercentage = 12;
      }
      
      // Calculate discounted price if discount applies
      if (hasDiscount) {
        originalPrice = product.price;
        discountedPrice = Math.round(product.price * (1 - discountPercentage / 100));
      }
      
      return {
        ...product,
        discount: hasDiscount ? discountPercentage : 0,
        discountedPrice,
        originalPrice,
        hasDiscount
      };
    }).filter(product => product.hasDiscount); // Only return products with discounts
    
    // Limit to 10 products and shuffle for variety
    return discountProducts
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(10, discountProducts.length));
  };
  
  const getPopularProducts = () => {
    // Create "popular" products based on different criteria
    const popularProducts = products.map(product => {
      let popularityScore = 0;
      let isPopular = false;
      
      // Scoring system for popularity:
      
      // 1. Products with shorter, catchier names are more popular
      if (product.name && product.name.length <= 15) {
        popularityScore += 20;
      }
      
      // 2. Products with round prices (ending in 00) are more popular
      if (product.price % 100 === 0) {
        popularityScore += 25;
      }
      
      // 3. Products in certain categories are more popular
      if (product.category && 
          (product.category.toLowerCase().includes('tablet') || 
           product.category.toLowerCase().includes('medicine'))) {
        popularityScore += 30;
      }
      
      // 4. Products with prices in the sweet spot (50-150) are more popular
      if (product.price >= 50 && product.price <= 150) {
        popularityScore += 15;
      }
      
      // 5. Products with descriptions are more trusted/popular
      if (product.description && product.description.length > 10) {
        popularityScore += 10;
      }
      
      // 6. Products with even IDs are more popular (arbitrary but creates variation)
      if (product.id % 2 === 0) {
        popularityScore += 5;
      }
      
      // Mark as popular if score is high enough
      isPopular = popularityScore >= 35;
      
      // Generate fake rating and review count for popular products
      const rating = isPopular ? (4 + Math.random()).toFixed(1) : null;
      const ratingCount = isPopular ? Math.floor(Math.random() * 500) + 50 : 0;
      
      return {
        ...product,
        popularityScore,
        isPopular,
        rating: rating ? parseFloat(rating) : null,
        ratingCount
      };
    }).filter(product => product.isPopular); // Only return popular products
    
    // Sort by popularity score and limit to 10
    return popularProducts
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, Math.min(10, popularProducts.length));
  };
  
  // Alternative simpler approach if you want to just divide products:
  const getDiscountProductsSimple = () => {
    // Simply take every other product starting from index 1
    return products
      .filter((_, index) => index % 2 === 1)
      .slice(0, 10)
      .map(product => ({
        ...product,
        discount: 10 + (product.id % 3) * 5, // 10%, 15%, or 20% discount
        discountedPrice: Math.round(product.price * 0.9),
        originalPrice: product.price
      }));
  };
  
  const getPopularProductsSimple = () => {
    // Simply take every other product starting from index 0
    return products
      .filter((_, index) => index % 2 === 0)
      .slice(0, 10)
      .map(product => ({
        ...product,
        rating: 4 + Math.random(),
        ratingCount: Math.floor(Math.random() * 200) + 50
      }));
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: "100vh", 
          bgcolor: "#f9f9f9",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          minHeight: "100vh", 
          bgcolor: "#f9f9f9",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography color="error">
          Error loading products: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        bgcolor: "#f9f9f9",
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100vw"
      }}
    >
      <Navbar />
      <Container 
        maxWidth="xl" 
        disableGutters 
        sx={{ 
          px: { xs: 1, sm: 2 },
          overflowX: "hidden"
        }}
      >
        <HeroBanner />
        {products.length > 0 && (
          <>
            <ProductCarousel 
              title="Today's Deals" 
              products={getDiscountProducts()} 
            />
            <ProductCarousel 
              title="Popular Products" 
              products={getPopularProducts()} 
            />
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;