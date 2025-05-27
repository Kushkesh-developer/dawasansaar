import React, { useState, useEffect } from "react";
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

const CategoryMenu = ({ label, subcategories }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
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
        {label}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
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
                <MenuList autoFocusItem={open}>
                  <MenuItem disabled>
                    <Typography variant="subtitle2" color="primary">
                      All {label}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  {subcategories && subcategories.map((subcat, index) => (
                    <MenuItem key={`${subcat}-${index}`} onClick={handleClose}>
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://ruby-dawasansar.onrender.com/categories', {
          method: 'GET',
          headers: {
            "ngrok-skip-browser-warning": "true"
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const response_data = await response.json();
        
        // Extract the categories array from the response
        const categoriesArray = response_data.data || response_data;
        
        // Ensure we have an array and transform the data structure
        if (Array.isArray(categoriesArray)) {
          const transformedCategories = categoriesArray.map(item => ({
            id: item.id,
            label: item.attributes.name,
            subcategories: item.attributes.subcategories || [] // Add subcategories if they exist
          }));
          setCategories(transformedCategories);
        } else {
          console.warn('API response does not contain a valid categories array:', response_data);
          setCategories([]);
        }
      } catch (err) {
        console.error("Error loading categories:", err);
        setError(err.message);
        setCategories([]); // Ensure categories remains an array
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Don't render anything while loading
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        sx={{ 
          width: "100%", 
          borderTop: "1px solid #eee", 
          borderBottom: "1px solid #eee",
          py: 2,
        }}
      >
        <Typography>Loading categories...</Typography>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        sx={{ 
          width: "100%", 
          borderTop: "1px solid #eee", 
          borderBottom: "1px solid #eee",
          py: 2,
        }}
      >
        <Typography color="error">Error loading categories: {error}</Typography>
      </Box>
    );
  }

  // Don't render if no categories
  if (!categories.length) {
    return null;
  }

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
        {categories.map((cat) => (
          <CategoryMenu
            key={cat.id}
            label={cat.label}
            subcategories={cat.subcategories}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoriesMenu;