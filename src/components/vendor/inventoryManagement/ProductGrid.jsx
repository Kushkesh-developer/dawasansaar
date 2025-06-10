import ProductCard from '../../ProductCard/ProductCard';
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Edit } from 'lucide-react';    


const ProductGrid = ({ products, stockFilter, onEditProduct }) => {
  const transformProductForCard = (product) => ({
    ...product,
    originalPrice: product.price,
    discountedPrice: product.price,
    discount: 0,
    isNew: false,
    rating: 0,
    ratingCount: 0,
    description: `Stock: ${product.quantity} units | Expires: ${new Date(product.expiryDate).toLocaleDateString()}`
  });

  return (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 3,
        mt: 2
      }}
    >
      {products.map((product) => {
        const isOutOfStock = product.quantity === 0;
        
        return (
          <Box key={product.id} sx={{ position: 'relative' }}>
            {/* Edit Button */}
            <IconButton
              size="small"
              onClick={() => onEditProduct(product)}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                zIndex: 2,
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'primary.dark' }
              }}
            >
              <Edit size={16} />
            </IconButton>
            
            <Box 
              sx={{ 
                filter: isOutOfStock ? 'grayscale(50%)' : 'none',
                opacity: isOutOfStock ? 0.7 : 1
              }}
            >
              <ProductCard product={transformProductForCard(product)} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ProductGrid;
