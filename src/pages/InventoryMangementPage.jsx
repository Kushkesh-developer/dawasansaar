import React, { useState, useMemo } from 'react';
import { Container, Box, Fab, Badge, Alert, Typography } from '@mui/material';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import InventoryHeader from  '../components/vendor/inventoryManagement/InventoryHeader';
import InventoryFilters from '../components/vendor/inventoryManagement/InventoryFilters';
import ProductGrid from '../components/vendor/inventoryManagement/ProductGrid';
import AddProductDialog from '../components/vendor/inventoryManagement/AddProductDialog';
import EditProductDialog from '../components/vendor/inventoryManagement/EditProductDialog';




const InventoryManagementPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Surgical Gloves',
      category: 'surgical',
      price: 25.99,
      quantity: 150,
      lowStockThreshold: 50,
      expiryDate: '2024-12-31',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    },
    {
      id: 2,
      name: 'Stethoscope',
      category: 'medical',
      price: 89.99,
      quantity: 25,
      lowStockThreshold: 20,
      expiryDate: '2025-06-15',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    },
    {
      id: 3,
      name: 'Surgical Masks',
      category: 'surgical',
      price: 15.99,
      quantity: 5,
      lowStockThreshold: 100,
      expiryDate: '2024-08-20',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    },
    {
      id: 4,
      name: 'Digital Thermometer',
      category: 'medical',
      price: 45.99,
      quantity: 0,
      lowStockThreshold: 15,
      expiryDate: '2025-03-10',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    },
    {
      id: 5,
      name: 'Surgical Scissors',
      category: 'surgical',
      price: 32.50,
      quantity: 8,
      lowStockThreshold: 10,
      expiryDate: '2025-01-15',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter;
    const matchesStock = stockFilter === 'all' || 
      (stockFilter === 'low' && product.quantity <= product.lowStockThreshold) ||
      (stockFilter === 'out' && product.quantity === 0);
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Stock alerts calculations
  const stockAlerts = useMemo(() => {
    const lowStock = products.filter(p => p.quantity <= p.lowStockThreshold && p.quantity > 0);
    const outOfStock = products.filter(p => p.quantity === 0);
    return { lowStock, outOfStock, total: lowStock.length + outOfStock.length };
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now()
    };
    setProducts([...products, newProduct]);
    setAddProductOpen(false);
  };

  const updateProduct = (id, productData) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ));
    setEditProductOpen(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditProductOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <InventoryHeader onAddProduct={() => setAddProductOpen(true)} />
      
      {/* Stock Alerts Section */}
      {stockAlerts.total > 0 && (
        <Box sx={{ mb: 3 }}>
          {stockAlerts.outOfStock.length > 0 && (
            <Alert severity="error" sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight="600">
                {stockAlerts.outOfStock.length} product(s) are out of stock
              </Typography>
            </Alert>
          )}
          {stockAlerts.lowStock.length > 0 && (
            <Alert severity="warning">
              <Typography variant="body2" fontWeight="600">
                {stockAlerts.lowStock.length} product(s) have low stock
              </Typography>
            </Alert>
          )}
        </Box>
      )}
      
      <InventoryFilters
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        stockFilter={stockFilter}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onStockChange={setStockFilter}
      />

      <ProductGrid 
        products={filteredProducts}
        stockFilter={stockFilter}
        onEditProduct={handleEditProduct}
      />

      {/* Stock Alert Floating Action Button */}
      {stockAlerts.total > 0 && (
        <Fab
          color={stockAlerts.outOfStock.length > 0 ? "error" : "warning"}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000
          }}
        >
          <Badge badgeContent={stockAlerts.total} color="error">
            <AlertTriangle size={24} />
          </Badge>
        </Fab>
      )}

      <AddProductDialog
        open={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onSave={addProduct}
      />

      <EditProductDialog
        open={editProductOpen}
        product={selectedProduct}
        onClose={() => {
          setEditProductOpen(false);
          setSelectedProduct(null);
        }}
        onSave={updateProduct}
      />
    </Container>
  );
};

export default InventoryManagementPage;