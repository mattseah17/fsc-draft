import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainPage from "./pages/MainPage";

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
  // Add more theme customizations here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
