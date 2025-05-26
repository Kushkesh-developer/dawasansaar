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
                  {subcategories.map((subcat) => (
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
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    fetch('https://f2ce-2405-201-300b-170-d7ad-1877-b4c8-d40e.ngrok-free.app/categories', {
      method: 'GET',
      headers: {
        "ngrok-skip-browser-warning": "true"
      },
    //   credentials: 'include' // only if you're using cookies/session
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Error loading categories:", err);
      });
  }, []);
  
  

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
            key={cat.label}
            label={cat.label}
            subcategories={cat.subcategories}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoriesMenu;
