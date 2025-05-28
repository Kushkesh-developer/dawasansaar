import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Badge,
    IconButton,
    Tooltip,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from "@mui/material";
import { Upload, ShoppingCart, User } from "lucide-react";

const NavbarActions = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    // Check for token in localStorage on component mount and when localStorage changes
    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('authToken');
            setIsLoggedIn(!!token);
        };

        // Check initially
        checkAuthStatus();

        // Listen for storage changes (useful if user logs in/out in another tab)
        window.addEventListener('storage', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('authToken');
        
        // Update state
        setIsLoggedIn(false);
        
        // Show logout confirmation dialog
        setShowLogoutDialog(true);
    };

    const handleCloseLogoutDialog = () => {
        setShowLogoutDialog(false);
    };

    const handleLogin = () => {
        // Redirect to signin page
        window.location.href = "/signin";
    };

    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Upload Prescription">
                <IconButton color="primary" aria-label="upload prescription">
                    <Upload size={isMobile ? 20 : 24} />
                </IconButton>
            </Tooltip>

            <Button
                onClick={() => window.location.href = "/profile"}
                variant="outlined"
                size="small"
                sx={{
                    display: { xs: "none", sm: "flex" },
                    borderRadius: "20px",
                    fontSize: "0.75rem"
                }}
            >
                Profile
            </Button>

            <Tooltip title="Shopping Cart">
                <IconButton
                    onClick={() => window.location.href = "/cart"}
                    aria-label="cart"
                >
                    <Badge badgeContent={0} color="primary">
                        <ShoppingCart size={isMobile ? 20 : 24} />
                    </Badge>
                </IconButton>
            </Tooltip>

            {isLoggedIn ? (
                <Button
                    variant="outlined"
                    startIcon={<User size={16} />}
                    onClick={handleLogout}
                    size="small"
                    sx={{ borderRadius: "20px", ml: 1 }}
                >
                    Logout
                </Button>
            ) : (
                <Button
                    variant="contained"
                    startIcon={<User size={16} />}
                    onClick={handleLogin}
                    size="small"
                    sx={{ borderRadius: "20px", ml: 1 }}
                >
                    Login
                </Button>
            )}

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={showLogoutDialog}
                onClose={handleCloseLogoutDialog}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={1}>
                        <User size={20} />
                        Logged Out Successfully
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        You have been successfully logged out. Your session has been cleared.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseLogoutDialog} 
                        variant="contained"
                        fullWidth
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NavbarActions;