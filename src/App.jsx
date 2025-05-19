
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/Home";
import CartPage from "./pages/CartPage";
import DawasansaarLogin from "./pages/LoginPage";
import ProfilePage from "./pages/ProfileaPage";


// Create a custom theme for Dawa Sansaar
const theme = createTheme({
  palette: {
    primary: {
      main: "#2E86C1", // Medical blue
      light: "#5DADE2",
      dark: "#1A5276",
      contrastText: "#fff",
    },
    secondary: {
      main: "#27AE60", // Pharmacy green
      light: "#58D68D",
      dark: "#196F3D",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Additional routes will be added here */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;