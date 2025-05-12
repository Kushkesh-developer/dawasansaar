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
  const hasDiscount = product.discount > 0;

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
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "contain", backgroundColor: "#f5f5f5", p: 2 }}
        />
        {hasDiscount && (
          <Chip
            label={`${product.discount}% OFF`}
            size="small"
            color="primary"
            sx={{
              position: "absolute",
              top: 8,
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
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="subtitle2"
          noWrap
          title={product.name}
          sx={{ fontWeight: 600 }}
        >
          {product.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div" mb={1}>
          {product.category}
        </Typography>
        
        {product.rating && (
          <Box display="flex" alignItems="center" mb={1}>
            <Rating value={product.rating} size="small" readOnly precision={0.5} />
            <Typography variant="caption" color="text.secondary" ml={0.5}>
              ({product.ratingCount || 0})
            </Typography>
          </Box>
        )}
        
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          mt="auto"
        >
          <Box>
            <Typography variant="body2" component="span" fontWeight={700}>
              ₹{hasDiscount ? product.discountedPrice : product.price}
            </Typography>
            {hasDiscount && (
              <Typography
                variant="caption"
                color="text.secondary"
                component="span"
                sx={{ ml: 0.5, textDecoration: "line-through" }}
              >
                ₹{product.originalPrice || product.price}
              </Typography>
            )}
          </Box>
          <IconButton 
            color="primary" 
            size="small"
            aria-label="add to cart"
          >
            <ShoppingCart size={18} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
