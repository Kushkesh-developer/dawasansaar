import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            mr: 1,
          }}
        >
          Dawa Sansaar
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
