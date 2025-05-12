import React, { useState } from "react";
import { 
  Box, 
  InputBase, 
  IconButton, 
  Paper 
} from "@mui/material";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Will be connected to API later
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: 300, md: 400 },
        border: "1px solid #ddd",
        boxShadow: "none",
      }}
      onSubmit={handleSearch}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for medicines, products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <Search size={20} />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;