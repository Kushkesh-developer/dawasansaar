
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/Home";
import CartPage from "./pages/CartPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfileaPage";
import PrescriptionPage from "./pages/PrescriptionPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import SignInPage from "./pages/SignInPage";
import AccountInformationPage from "./pages/AccountInformation";
import WishlistPage from "./components/WishListPage";
import MyPrescriptionPage from "./pages/MyPrescription";
import EditProfilePage from "./pages/EditPages";


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
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />}>
              <Route path="account" element={<AccountInformationPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="prescription" element={<MyPrescriptionPage />} />
              <Route path="edit" element={<EditProfilePage />} />
            </Route>
          
            <Route path='/prescription' element={<PrescriptionPage/>}/>
            <Route path="/product/:id" element={<ProductDescriptionPage />} />
            {/* Additional routes will be added here */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;