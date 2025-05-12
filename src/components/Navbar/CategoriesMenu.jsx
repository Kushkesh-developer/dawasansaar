import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Popper, 
  Grow, 
  Paper, 
  MenuList, 
  MenuItem, 
  ClickAwayListener, 
  Divider, 
  Typography 
} from "@mui/material";
import { ChevronDown } from "lucide-react";

// Mock data for categories
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

const CategoryMenu = ({ category }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const categoryData = CATEGORIES[category];

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        endIcon={<ChevronDown size={16} />}
        sx={{ 
          textTransform: "none", 
          fontSize: "1rem",
          fontWeight: 500, 
          color: "text.primary" 
        }}
      >
        {categoryData.label}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ width: 250, maxHeight: 400, overflow: 'auto' }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id={`${category}-menu`}>
                  <MenuItem disabled>
                    <Typography variant="subtitle2" color="primary">
                      All {categoryData.label}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  {categoryData.subcategories.map((subcat) => (
                    <MenuItem key={subcat} onClick={handleClose}>
                      {subcat}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

const CategoriesMenu = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      sx={{ 
        width: "100%", 
        borderTop: "1px solid #eee", 
        borderBottom: "1px solid #eee",
        py: 0.5,
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          gap: 2, 
          maxWidth: 1200, 
          width: "100%", 
          px: 2, 
          justifyContent: { xs: "center", md: "flex-start" } 
        }}
      >
        <CategoryMenu category="medicine" />
        <CategoryMenu category="surgical" />
      </Box>
    </Box>
  );
};

export default CategoriesMenu;