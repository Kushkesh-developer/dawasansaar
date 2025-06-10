// import React from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Container,
//   Typography,
//   Grid,
//   Alert,
//   Chip,
//   Divider,
//   useTheme
// } from '@mui/material';
// import { 
//   Package, 
//   TrendingUp, 
//   DollarSign, 
//   AlertTriangle,
//   CheckCircle,
//   Clock
// } from 'lucide-react';



// export default function VendorDashboard({ 
//   surgicalCount = 8, 
//   medicalCount = 15 
// }) {
//   const theme = useTheme();

//   // Mock data for recent orders
//   const recentOrders = [
//     { id: 'ORD-001', date: '2024-06-04', status: 'fulfilled', amount: 2500 },
//     { id: 'ORD-002', date: '2024-06-03', status: 'pending', amount: 1800 },
//     { id: 'ORD-003', date: '2024-06-02', status: 'fulfilled', amount: 3200 },
//     { id: 'ORD-004', date: '2024-06-01', status: 'fulfilled', amount: 950 },
//     { id: 'ORD-005', date: '2024-05-31', status: 'pending', amount: 2100 }
//   ];

//   // Mock payment data
//   const totalPayments = 12650;
//   const totalCommission = 1265;

//   const getStatusColor = (status) => {
//     return status === 'fulfilled' ? 'success' : 'warning';
//   };

//   const getStatusIcon = (status) => {
//     return status === 'fulfilled' ? <CheckCircle size={16} /> : <Clock size={16} />;
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
//         Vendor Dashboard
//       </Typography>

//       {/* Stock Summary Section */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
//           Stock Summary
//         </Typography>
        
//         <Grid container spacing={3}>
//           {/* Surgical Products Alert */}
//           {surgicalCount < 10 && (
//             <Grid size={{xs:12}}>
//               <Alert 
//                 severity="error" 
//                 icon={<AlertTriangle />}
//                 sx={{ 
//                   bgcolor: 'error.light',
//                   color: 'error.contrastText',
//                   '& .MuiAlert-icon': {
//                     color: 'error.contrastText'
//                   }
//                 }}
//               >
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   Low Stock Alert - Surgical Products
//                 </Typography>
//                 <Typography variant="body2">
//                   Only {surgicalCount} surgical products remaining. Restock immediately!
//                 </Typography>
//               </Alert>
//             </Grid>
//           )}

//           {/* Medical Products Alert */}
//           {medicalCount < 20 && (
//             <Grid size={{xs:12}}>
//               <Alert 
//                 severity="error" 
//                 icon={<AlertTriangle />}
//                 sx={{ 
//                   bgcolor: 'error.light',
//                   color: 'error.contrastText',
//                   '& .MuiAlert-icon': {
//                     color: 'error.contrastText'
//                   }
//                 }}
//               >
//                 <Typography variant="subtitle1" fontWeight="bold">
//                   Low Stock Alert - Medical Products
//                 </Typography>
//                 <Typography variant="body2">
//                   Only {medicalCount} medical products remaining. Restock soon!
//                 </Typography>
//               </Alert>
//             </Grid>
//           )}

//           {/* Stock Cards */}
//           <Grid size={{xs:12,md:6}}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <Package size={24} color={theme.palette.primary.main} />
//                   <Typography variant="h6" sx={{ ml: 1 }}>
//                     Surgical Products
//                   </Typography>
//                 </Box>
//                 <Typography variant="h3" color="primary" fontWeight="bold">
//                   {surgicalCount}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Items in stock
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid size={{xs:12,md:6}}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <Package size={24} color={theme.palette.secondary.main} />
//                   <Typography variant="h6" sx={{ ml: 1 }}>
//                     Medical Products
//                   </Typography>
//                 </Box>
//                 <Typography variant="h3" color="secondary" fontWeight="bold">
//                   {medicalCount}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Items in stock
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Recent Orders Section */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
//           Recent Orders
//         </Typography>
        
//         <Card>
//           <CardContent>
//             {recentOrders.map((order, index) => (
//               <Box key={order.id}>
//                 <Box sx={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'center',
//                   py: 2
//                 }}>
//                   <Box>
//                     <Typography variant="subtitle1" fontWeight="medium">
//                       {order.id}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {order.date}
//                     </Typography>
//                   </Box>
                  
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Typography variant="subtitle2">
//                       ₹{order.amount.toLocaleString()}
//                     </Typography>
//                     <Chip
//                       icon={getStatusIcon(order.status)}
//                       label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                       color={getStatusColor(order.status)}
//                       size="small"
//                     />
//                   </Box>
//                 </Box>
//                 {index < recentOrders.length - 1 && <Divider />}
//               </Box>
//             ))}
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Payments Summary Section */}
//       <Box>
//         <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
//           Payments Summary
//         </Typography>
        
//         <Grid container spacing={3}>
//           <Grid size={{xs:12,md:6}}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <TrendingUp size={24} color={theme.palette.success.main} />
//                   <Typography variant="h6" sx={{ ml: 1 }}>
//                     Total Payments Received
//                   </Typography>
//                 </Box>
//                 <Typography variant="h3" color="success.main" fontWeight="bold">
//                   ₹{totalPayments.toLocaleString()}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   This month
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid size={{xs:12,md:6}}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <DollarSign size={24} color={theme.palette.warning.main} />
//                   <Typography variant="h6" sx={{ ml: 1 }}>
//                     Commission Earned
//                   </Typography>
//                 </Box>
//                 <Typography variant="h3" color="warning.main" fontWeight="bold">
//                   ₹{totalCommission.toLocaleString()}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   10% of total sales
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }
