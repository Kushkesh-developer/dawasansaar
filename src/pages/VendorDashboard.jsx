
import React from 'react';
import { 
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Badge
} from '@mui/material';
import { 
  Package,  
  CreditCard,
  Scissors
} from 'lucide-react';

export default function VendorDashboardPage() {
  
  // Mock inventory data
  const inventoryData = {
    surgical: { total: 2000, current: 800 },
    medical: { total: 5000, current: 3000 }
  };

  // Mock low stock items
  const lowStockItems = [
    {
      id: 1,
      name: 'Surgical gloves',
      price: '$200',
      stock: '150/200',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    },
    {
      id: 2,
      name: 'Stethoscopes', 
      price: '$300',
      stock: '250/300',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    }
  ];

  // Mock recent orders
  const recentOrders = [
    {
      id: '#23456',
      amount: '$1,200',
      items: '12 items',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    },
    {
      id: '#23457',
      amount: '$1,500', 
      items: '15 items',
      image: '/lovable-uploads/de2242ba-f9af-42a4-a01e-14285ccf52df.png'
    }
  ];

  // Mock recent payments
  const recentPayments = [
    {
      id: '#12345',
      amount: '$1,200',
      status: 'Paid',
      orderId: '#23456'
    },
    {
      id: '#12346', 
      amount: '$1,500',
      status: 'Paid',
      orderId: '#23457'
    }
  ];

  const handleInventoryClick = (type) => {
    console.log(`Navigating to ${type} inventory`);
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Navigation */}
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {/* <Toolbar> */}
          {/* Logo */}
          {/* <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Package size={24} color="#333" />
            <Typography variant="h6" sx={{ ml: 1, color: '#333', fontWeight: 'bold' }}>
              PharmaCo
            </Typography>
          </Box> */}

          {/* Navigation Links */}
          {/* <Box sx={{ display: 'flex', gap: 3, flexGrow: 1 }}>
            <Button sx={{ color: '#333', fontWeight: 500 }} startIcon={<Home size={16} />}>
              Home
            </Button>
            <Button sx={{ color: '#666' }} startIcon={<ShoppingCart size={16} />}>
              Orders
            </Button>
            <Button sx={{ color: '#666' }} startIcon={<CreditCard size={16} />}>
              Payments
            </Button>
            <Button sx={{ color: '#666' }} startIcon={<List size={16} />}>
              Listings
            </Button>
            <Button sx={{ color: '#666' }} startIcon={<BarChart size={16} />}>
              Reports
            </Button>
          </Box> */}

          {/* Right Side Icons */}
          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton>
              <MessageCircle size={20} color="#666" />
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <Bell size={20} color="#666" />
              </Badge>
            </IconButton>
            <IconButton>
              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#e0e0e0' }}>
                <User size={16} color="#666" />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar> */}
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Dashboard Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="#333">
            Dashboard
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ 
              borderColor: '#ddd',
              color: '#666',
              '&:hover': {
                borderColor: '#ccc',
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            New order
          </Button>
        </Box>

        {/* Inventory Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#333', fontWeight: 600 }}>
            Inventory
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Surgical Card */}
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#f9f9f9'
                  }
                }}
                onClick={() => handleInventoryClick('surgical')}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Scissors size={20} color="#666" />
                    <Typography variant="h6" sx={{ ml: 1, color: '#333', fontWeight: 600 }}>
                      Surgical
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="#999">
                    Total: {inventoryData.surgical.total.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Medical Card */}
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#f9f9f9'
                  }
                }}
                onClick={() => handleInventoryClick('medical')}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Package size={20} color="#666" />
                    <Typography variant="h6" sx={{ ml: 1, color: '#333', fontWeight: 600 }}>
                      Medical
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="#999">
                    Total: {inventoryData.medical.total.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Stock Progress Bars */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#333', fontWeight: 500 }}>
              Surgical
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(inventoryData.surgical.current / inventoryData.surgical.total) * 100}
              sx={{ 
                height: 8, 
                borderRadius: 4, 
                mb: 1,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#333'
                }
              }}
            />
            <Typography variant="body2" color="#666">
              {inventoryData.surgical.current.toLocaleString()}/{inventoryData.surgical.total.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: '#333', fontWeight: 500 }}>
              Medical
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(inventoryData.medical.current / inventoryData.medical.total) * 100}
              sx={{ 
                height: 8, 
                borderRadius: 4, 
                mb: 1,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#333'
                }
              }}
            />
            <Typography variant="body2" color="#666">
              {inventoryData.medical.current.toLocaleString()}/{inventoryData.medical.total.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Low Stock Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#333', fontWeight: 600 }}>
            Low stock
          </Typography>
          
          {lowStockItems.map((item) => (
            <Box key={item.id} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              p: 2,
              mb: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={item.image} 
                  variant="rounded" 
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="500" color="#333">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="#666">
                    {item.price}
                  </Typography>
                  <Typography variant="body2" color="#666">
                    {item.stock}
                  </Typography>
                </Box>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  borderColor: '#ddd',
                  color: '#666',
                  '&:hover': {
                    borderColor: '#ccc',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                Restock
              </Button>
            </Box>
          ))}
        </Box>

        {/* Recent Orders Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#333', fontWeight: 600 }}>
            Recent orders
          </Typography>
          
          {recentOrders.map((order) => (
            <Box key={order.id} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              p: 2,
              mb: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={order.image} 
                  variant="rounded" 
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="500" color="#333">
                    Order {order.id}
                  </Typography>
                  <Typography variant="body2" color="#666">
                    {order.amount}
                  </Typography>
                  <Typography variant="body2" color="#666">
                    {order.items}
                  </Typography>
                </Box>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  borderColor: '#ddd',
                  color: '#666',
                  '&:hover': {
                    borderColor: '#ccc',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                Track
              </Button>
            </Box>
          ))}
        </Box>

        {/* Recent Payments Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#333', fontWeight: 600 }}>
            Recent payments
          </Typography>
          
          {recentPayments.map((payment) => (
            <Box key={payment.id} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              p: 2,
              mb: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  width: 40, 
                  height: 40, 
                  mr: 2, 
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #e0e0e0'
                }}>
                  <CreditCard size={20} color="#666" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="500" color="#333">
                    Payment {payment.id}
                  </Typography>
                  <Typography variant="body2" color="#666">
                    {payment.status}
                  </Typography>
                  <Typography variant="body2" color="#666">
                    Order {payment.orderId}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" fontWeight="600" color="#333">
                {payment.amount}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}