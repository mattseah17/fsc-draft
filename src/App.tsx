import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InspectionSchedule from "./pages/InspectionSchedule";

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans", sans-serif',
  },
  // You can add more theme customizations here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <InspectionSchedule />
    </ThemeProvider>
  );
}

export default App;
