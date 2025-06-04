import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Rating,
  IconButton
} from "@mui/material";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  // Handle cases where discount fields might not exist
  const hasDiscount = product.discount && product.discount > 0;
  
  // Use the first image from the images array, or fallback to image field
  const productImage = product.image || (product.images && product.images[0]) || '/placeholder-image.png';
  
  return (
    <Card
      sx={{
        maxWidth: 220,
        minWidth: 220,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        borderRadius: 2,
        mr: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }
      }}
    >
      <Box position="relative">
        <CardMedia
          component="img"
          height="140"
          image={productImage}
          alt={product.name}
          sx={{ 
            objectFit: "cover", 
            backgroundColor: "#f5f5f5", 
            cursor: "pointer" 
          }}
        />
        {hasDiscount && (
          <Chip
            label={`${product.discount}% OFF`}
            size="small"
            color="primary"
            sx={{
              position: "absolute",
              top: 10,
              left: 8,
              fontSize: "0.7rem",
            }}
          />
        )}
        {product.isNew && (
          <Chip
            label="New"
            size="small"
            color="secondary"
            sx={{
              position: "absolute",
              top: hasDiscount ? 36 : 8,
              left: 8,
              fontSize: "0.7rem",
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: 2,
        "&:last-child": { pb: 2 }
      }}>
        <Typography
          variant="subtitle2"
          noWrap
          title={product.name}
          sx={{ 
            fontWeight: 600,
            mb: 0.5,
            cursor: "pointer",
            "&:hover": {
              color: "primary.main"
            }
          }}
        >
          {product.name}
        </Typography>
        
        <Typography 
          variant="caption" 
          color="text.secondary" 
          component="div" 
          mb={1}
          sx={{ textTransform: "capitalize" }}
        >
          {product.category}
        </Typography>
        
        {/* Show description if available */}
        {product.description && (
          <Typography 
            variant="caption" 
            color="text.secondary" 
            component="div" 
            mb={1}
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
              minHeight: '2.6em' // Maintain consistent height
            }}
          >
            {product.description}
          </Typography>
        )}
        
        {/* Only show rating if it exists */}
        {product.rating && product.rating > 0 && (
          <Box display="flex" alignItems="center" mb={1}>
            <Rating 
              value={product.rating} 
              size="small" 
              readOnly 
              precision={0.5}
              sx={{ mr: 0.5 }}
            />
            <Typography variant="caption" color="text.secondary">
              ({product.ratingCount || 0})
            </Typography>
          </Box>
        )}
        
        {/* Price and Add to Cart section */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="auto"
          pt={1}
        >
          <Box>
            <Typography 
              variant="body2" 
              component="span" 
              fontWeight={700}
              color="primary.main"
            >
              ₹{hasDiscount ? product.discountedPrice : product.price}
            </Typography>
            {hasDiscount && (
              <Typography
                variant="caption"
                color="text.secondary"
                component="span"
                sx={{ 
                  ml: 0.5, 
                  textDecoration: "line-through",
                  fontSize: "0.75rem"
                }}
              >
                ₹{product.originalPrice || product.price}
              </Typography>
            )}
          </Box>
          
          <IconButton
            color="primary"
            size="small"
            aria-label="add to cart"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              width: 32,
              height: 32,
              "&:hover": {
                backgroundColor: "primary.dark",
                transform: "scale(1.1)"
              }
            }}
          >
            <ShoppingCart size={16} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;