import React, { useState } from "react";
import { Box } from "@mui/material";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import InspectionScheduleContent from "../components/InspectionScheduleContent/InspectionScheduleContent";
import Dashboard from "../components/Dashboard/Dashboard";
import RotaCommanderView from "../components/RotaCommanderView/RotaCommanderView";
import { useAuth } from "../contexts/AuthContext";

const MainPage: React.FC = () => {
  const [isAssignMode, setIsAssignMode] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<"dashboard" | "scheduler">(
    "scheduler"
  );
  const { user } = useAuth();

  const handleRouteChange = (route: "dashboard" | "scheduler") => {
    setCurrentRoute(route);
    if (route === "dashboard") {
      setIsAssignMode(false);
    }
  };

  const renderContent = () => {
    if (currentRoute === "dashboard") {
      return <Dashboard />;
    }

    if (user?.role === "ENFORCEMENT_OIC") {
      return <InspectionScheduleContent onAssignModeChange={setIsAssignMode} />;
    }

    return <RotaCommanderView />;
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
        <Box sx={{ marginTop: "48px" }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
};

export default MainPage;
