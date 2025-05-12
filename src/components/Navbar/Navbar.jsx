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
  Collapse,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavbarActions from "./NavbarActions";
import CategoriesMenu from "./CategoriesMenu";

// Mock data for categories (same as in CategoriesMenu)
const CATEGORIES = {
  medicine: {
    label: "Medicines",
    subcategories: [
      "Fever & Pain Management",
      "Cough & Cold",
      "Digestive Health",
      "Vitamins & Supplements",
      "Skin Care",
      "Diabetes Care",
      "Heart Health",
    ],
  },
  surgical: {
    label: "Surgical Items",
    subcategories: [
      "Masks & Face Shields",
      "Gloves",
      "First Aid",
      "Bandages & Dressings",
      "Syringes & Needles",
      "Medical Devices",
      "Personal Protective Equipment",
    ],
  },
};

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({
    medicine: false,
    surgical: false
  });
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

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const renderCategoryDrawerItems = () => {
    return Object.entries(CATEGORIES).map(([key, category]) => (
      <React.Fragment key={key}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => toggleCategory(key)}>
            <ListItemText primary={category.label} />
            {openCategories[key] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openCategories[key]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.subcategories.map((subcat) => (
              <ListItem key={subcat} sx={{ pl: 4 }}>
                <ListItemButton>
                  <ListItemText primary={subcat} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    ));
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
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <ListItemText 
                primary="Categories" 
                primaryTypographyProps={{ fontWeight: "bold" }} 
              />
            </ListItem>

            {renderCategoryDrawerItems()}

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