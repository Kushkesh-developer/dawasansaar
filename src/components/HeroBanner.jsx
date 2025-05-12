import React from "react";
import { Box, Paper, Typography, Button, Container, IconButton } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for banners
const BANNERS = [
  {
    id: 1,
    title: "Save 25% on your first order",
    description: "Use code FIRST25 at checkout",
    bgColor: "#E3F2FD",
    textColor: "#0D47A1",
  },
  {
    id: 2,
    title: "Free health checkup with orders above ₹999",
    description: "Limited time offer",
    bgColor: "#E8F5E9",
    textColor: "#1B5E20",
  },
  {
    id: 3,
    title: "Diabetic essentials sale",
    description: "Up to 40% off on all diabetes care products",
    bgColor: "#FFF3E0",
    textColor: "#E65100",
  },
];

const HeroBanner = () => {
  const [currentBanner, setCurrentBanner] = React.useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextBanner,
    onSwipedRight: prevBanner,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const activeBanner = BANNERS[currentBanner];

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      <Box position="relative" {...handlers}>
        <Paper
          elevation={0}
          sx={{
            height: { xs: 180, md: 300 },
            bgcolor: activeBanner.bgColor,
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 3, md: 6 },
          }}
        >
          <Box maxWidth="60%">
            <Typography
              variant="h3"
              component="h1"
              fontWeight={700}
              color={activeBanner.textColor}
              sx={{ 
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                mb: 1 
              }}
            >
              {activeBanner.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color={activeBanner.textColor}
              sx={{ 
                mb: 3,
                display: { xs: "none", sm: "block" } 
              }}
            >
              {activeBanner.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ borderRadius: 28, textTransform: "none" }}
            >
              Shop Now
            </Button>
          </Box>
        </Paper>

        {/* Banner Navigation */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
          }}
        >
          {BANNERS.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentBanner(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: index === currentBanner ? "primary.main" : "grey.300",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>

        {/* Banner Arrows */}
        <IconButton
          onClick={prevBanner}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "background.paper" },
            display: { xs: "none", md: "flex" },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          onClick={nextBanner}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "background.paper" },
            display: { xs: "none", md: "flex" },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Container>
  );
};

export default HeroBanner;
