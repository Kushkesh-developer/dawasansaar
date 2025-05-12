import React, { useState } from "react";
import { 
  AppBar, 
  Toolbar, 
  Container,
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import { Menu } from "lucide-react";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavbarActions from "./NavbarActions";
import CategoriesMenu from "./CategoriesMenu";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0} sx={{ backgroundColor: "white" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 1 }}
              >
                <Menu />
              </IconButton>
            )}

            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              <Logo />
            </Box>

            {isMobile ? (
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Logo />
              </Box>
            ) : (
              <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <SearchBar />
              </Box>
            )}

            <Box sx={{ flexGrow: { xs: 0, md: 0 } }}>
              <NavbarActions />
            </Box>
          </Toolbar>
        </Container>
        
        {!isMobile && <CategoriesMenu />}

        {isMobile && (
          <Box sx={{ width: "100%", padding: 1 }}>
            <SearchBar />
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <ListItemText primary="Categories" primaryTypographyProps={{ fontWeight: "bold" }} />
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Medicines" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Surgical Items" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Offers" />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Upload Prescription" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
