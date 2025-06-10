import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Chip, 
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Badge,
  Card,
  CardContent,
  Tabs,
  Tab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  Package, 
  TrendingUp, 
  Download, 
  Filter,
  Home,
  ShoppingCart,
  CreditCard,
  List,
  BarChart,
  MessageCircle,
  Bell,
  User,
  History,
  Receipt,
  MoreHorizontal
} from 'lucide-react';





const VendorTransactionsPage= () => {
  const [activeTab, setActiveTab] = useState(0);

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-06-08',
      items: 'Paracetamol 500mg (2), Vitamin D3 (1)',
      userName: 'Rajesh Kumar',
      deliveryStatus: 'Delivered',
      amount: 450.00,
      commission: 45.00
    },
    {
      id: 'ORD-2024-002',
      date: '2024-06-07',
      items: 'Blood Pressure Monitor (1)',
      userName: 'Priya Sharma',
      deliveryStatus: 'In Transit',
      amount: 2850.00,
      commission: 285.00
    },
    {
      id: 'ORD-2024-003',
      date: '2024-06-06',
      items: 'Insulin Pen (2), Test Strips (3)',
      userName: 'Mohammed Ali',
      deliveryStatus: 'Delivered',
      amount: 1200.00,
      commission: 120.00
    },
    {
      id: 'ORD-2024-004',
      date: '2024-06-05',
      items: 'Face Masks (50), Hand Sanitizer (2)',
      userName: 'Sneha Patel',
      deliveryStatus: 'Processing',
      amount: 320.00,
      commission: 32.00
    }
  ];

  const payments = [
    {
      id: 'PAY-001',
      amount: 450.00,
      datePaid: '2024-06-09',
      mode: 'UPI',
      orderId: 'ORD-2024-001'
    },
    {
      id: 'PAY-002',
      amount: 1200.00,
      datePaid: '2024-06-08',
      mode: 'Bank Transfer',
      orderId: 'ORD-2024-003'
    },
    {
      id: 'PAY-003',
      amount: 850.00,
      datePaid: '2024-06-07',
      mode: 'UPI',
      orderId: 'ORD-2024-005'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#4caf50';
      case 'In Transit': return '#ff9800';
      case 'Processing': return '#2196f3';
      case 'Cancelled': return '#f44336';
      default: return '#666';
    }
  };

  const getPaymentModeColor = (mode) => {
    switch (mode) {
      case 'UPI': return '#9c27b0';
      case 'Bank Transfer': return '#2196f3';
      case 'Cash': return '#4caf50';
      default: return '#666';
    }
  };

  const exportToCSV = () => {
    const csvData = orders.map(order => ({
      'Order ID': order.id,
      'Date': order.date,
      'Items': order.items,
      'Customer': order.userName,
      'Status': order.deliveryStatus,
      'Amount': order.amount,
      'Commission': order.commission
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendor-transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalCommission = orders.reduce((sum, order) => sum + order.commission, 0);

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Navigation */}
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      
          {/* Logo */}
          {/* <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Package size={24} color="#333" />
            <Typography variant="h6" sx={{ ml: 1, color: '#333', fontWeight: 'bold' }}>
              PharmaCo
            </Typography>
          </Box> */}

          {/* Navigation Links */}
          {/* <Box sx={{ display: 'flex', gap: 3, flexGrow: 1 }}>
            <Button sx={{ color: '#666' }} startIcon={<Home size={16} />}>
              Home
            </Button>
            <Button sx={{ color: '#666' }} startIcon={<ShoppingCart size={16} />}>
              Orders
            </Button>
            <Button sx={{ color: '#666' }} startIcon={<CreditCard size={16} />}>
              Payments
            </Button>
            <Button sx={{ color: '#333', fontWeight: 500 }} startIcon={<History size={16} />}>
              Transactions
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
          </Box> */}
        
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold" color="#333" sx={{ mb: 1 }}>
              Transactions & Order History
            </Typography>
            <Typography variant="body1" color="#666">
              Track and manage your transaction records
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Download size={16} />}
            onClick={exportToCSV}
            sx={{ 
              backgroundColor: '#2E86C1',
              '&:hover': { backgroundColor: '#1A5276' }
            }}
          >
            Export CSV
          </Button>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <CardContent sx={{ color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      ₹{totalRevenue.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Revenue
                    </Typography>
                  </Box>
                  <TrendingUp size={40} style={{ opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <CardContent sx={{ color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      ₹{totalCommission.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Commission
                    </Typography>
                  </Box>
                  <Receipt size={40} style={{ opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <CardContent sx={{ color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {orders.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Orders
                    </Typography>
                  </Box>
                  <ShoppingCart size={40} style={{ opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <Tab label="Order History" />
            <Tab label="Payment History" />
          </Tabs>

          {/* Orders Tab */}
          {activeTab === 0 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="600">
                  Fulfilled Orders
                </Typography>
                <Button size="small" startIcon={<Filter size={16} />}>
                  Filter
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Items</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Commission</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="500">
                            {order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(order.date).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {order.items}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {order.userName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.deliveryStatus}
                            size="small"
                            sx={{ 
                              backgroundColor: getStatusColor(order.deliveryStatus),
                              color: 'white',
                              fontWeight: 500
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="600">
                            ₹{order.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="600" color="#27AE60">
                            ₹{order.commission.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <MoreHorizontal size={16} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Payments Tab */}
          {activeTab === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
                Payment History
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Payment ID</TableCell>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date Paid</TableCell>
                      <TableCell>Payment Mode</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="500">
                            {payment.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {payment.orderId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="600">
                            ₹{payment.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(payment.datePaid).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={payment.mode}
                            size="small"
                            sx={{ 
                              backgroundColor: getPaymentModeColor(payment.mode),
                              color: 'white',
                              fontWeight: 500
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default VendorTransactionsPage;
