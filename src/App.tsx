import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainPage from "./pages/MainPage";
import { AuthProvider } from "./contexts/AuthContext";
import { PremisesProvider } from "./contexts/PremisesContext";

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
  // Add more theme customizations here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <PremisesProvider>
          <MainPage />
        </PremisesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
