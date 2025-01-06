import React, { useState } from "react";
import { Box } from "@mui/material";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import InspectionScheduleContent from "../components/InspectionScheduleContent/InspectionScheduleContent";
import Dashboard from "../components/Dashboard/Dashboard";

const MainPage: React.FC = () => {
  const [isAssignMode, setIsAssignMode] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<"dashboard" | "scheduler">(
    "scheduler"
  );

  const handleRouteChange = (route: "dashboard" | "scheduler") => {
    setCurrentRoute(route);
    // Reset assign mode when switching routes
    if (route === "dashboard") {
      setIsAssignMode(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <SideNav onRouteChange={handleRouteChange} currentRoute={currentRoute} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <TopNav page={isAssignMode ? "Assign Premises" : undefined} />
        <Box sx={{ marginTop: "48px" }}>
          {currentRoute === "scheduler" ? (
            <InspectionScheduleContent onAssignModeChange={setIsAssignMode} />
          ) : (
            <Dashboard />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
