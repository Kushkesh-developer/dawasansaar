import React from "react";
import {
    Box,
    Button,
    Badge,
    IconButton,
    Tooltip,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { Upload, ShoppingCart, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom"; // ✅ Add this import

const NavbarActions = () => {
    const { user, logout } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Upload Prescription">
                <IconButton color="primary" aria-label="upload prescription">
                    <Upload size={isMobile ? 20 : 24} />
                </IconButton>
            </Tooltip>

            <Button
                component={Link}
                to="/profile"
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
                    component={Link}     
                    to="/cart"           
                    aria-label="cart"
                >
                    <Badge badgeContent={0} color="primary">
                        <ShoppingCart size={isMobile ? 20 : 24} />
                    </Badge>
                </IconButton>
            </Tooltip>

            {user ? (
                <Button
                    variant="outlined"
                    startIcon={<User size={16} />}
                    onClick={logout}
                    size="small"
                    sx={{ borderRadius: "20px", ml: 1 }}
                >
                    Logout
                </Button>
            ) : (
                <Button
                    variant="contained"
                    startIcon={<User size={16} />}
                    href="/login"
                    size="small"
                    sx={{ borderRadius: "20px", ml: 1 }}
                >
                    Login
                </Button>
            )}
        </Box>
    );
};

export default NavbarActions;
