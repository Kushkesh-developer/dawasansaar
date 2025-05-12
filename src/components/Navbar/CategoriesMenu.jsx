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
  Typography,
  useMediaQuery,
  useTheme
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
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

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
          color: "text.primary",
          ...(isMobileScreen && { 
            width: '100%', 
            justifyContent: 'space-between' 
          })
        }}
      >
        {categoryData.label}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={isMobileScreen ? "bottom" : "bottom-start"}
        transition
        disablePortal
        style={{ 
          zIndex: 1300, 
          width: isMobileScreen ? '100%' : 250 
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper 
              sx={{ 
                width: isMobileScreen ? '100%' : 250, 
                maxHeight: 400, 
                overflow: 'auto',
                margin: isMobileScreen ? '0 16px' : 0
              }}
            >
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
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

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
          flexDirection: isMobileScreen ? 'column' : 'row',
          gap: 2, 
          maxWidth: 1200, 
          width: "100%", 
          px: 2, 
          alignItems: isMobileScreen ? 'stretch' : 'center',
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