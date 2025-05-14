import React, { useState } from "react";
import { 
  Box, 
  InputBase, 
  IconButton, 
  Paper,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Will be connected to API later
  };

  // Determine width based on screen size
  const getSearchBarWidth = () => {
    if (isMobile) return "80%";
    if (isTablet) return "350px";
    return "450px";
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center',
      width: '100%'
    }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: getSearchBarWidth(),
          border: "1px solid #ddd",
          boxShadow: "none",
          borderRadius: isMobile ? 4 : 8,
          maxWidth: "100%"
        }}
        onSubmit={handleSearch}
      >
        <InputBase
          sx={{ 
            ml: 1, 
            flex: 1,
            fontSize: isMobile ? '0.875rem' : '1rem',
            '& .MuiInputBase-input': {
              padding: isMobile ? '6px 0' : '8px 0'
            }
          }}
          placeholder={isMobile ? "Search..." : "Search for medicines, products..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton 
          type="submit" 
          sx={{ 
            p: isMobile ? "6px" : "10px"
          }} 
          aria-label="search"
        >
          <Search fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;