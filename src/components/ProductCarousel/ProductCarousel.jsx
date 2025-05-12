import React, { useRef } from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";

const ProductCarousel = ({ title, products }) => {
  const scrollRef = useRef(null);
  
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 240; // Card width + margin
      const scrollLeft = direction === "left" 
        ? current.scrollLeft - scrollAmount
        : current.scrollLeft + scrollAmount;
        
      current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };
  
  const handlers = useSwipeable({
    onSwipedLeft: () => scroll("right"),
    onSwipedRight: () => scroll("left"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Box sx={{ position: "relative" }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="h2" fontWeight={600}>
            {title}
          </Typography>
          
          <Box>
            <IconButton 
              onClick={() => scroll("left")} 
              size="small"
              sx={{ mr: 0.5 }}
            >
              <ChevronLeft size={20} />
            </IconButton>
            <IconButton 
              onClick={() => scroll("right")} 
              size="small"
            >
              <ChevronRight size={20} />
            </IconButton>
          </Box>
        </Box>
        
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": { display: "none" }, // Chrome
            pb: 1,
          }}
          {...handlers}
        >
          {products.map((product) => (
            <Box key={product.id} sx={{ minWidth: 220, mr: 2 }}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductCarousel;