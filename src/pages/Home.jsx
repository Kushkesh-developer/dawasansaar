
import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import { DISCOUNT_PRODUCTS, POPULAR_PRODUCTS } from "../data/mockProducts";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        bgcolor: "#f9f9f9",
        overflowX: "hidden", // Prevent horizontal scroll
        width: "100%", // Ensure it takes full width
        maxWidth: "100vw" // Restrict to viewport width
      }}
    >
      <Navbar />
      <Container 
        maxWidth="xl" 
        disableGutters 
        sx={{ 
          px: { xs: 1, sm: 2 }, // Responsive padding
          overflowX: "hidden" // Extra prevention for horizontal scroll
        }}
      >
        <HeroBanner />
        <ProductCarousel title="Today's Deals" products={DISCOUNT_PRODUCTS} />
        <ProductCarousel title="Popular Products" products={POPULAR_PRODUCTS} />
        {/* Footer will be added later */}
      </Container>
      <Footer/>
    </Box>
  );
};

export default HomePage;