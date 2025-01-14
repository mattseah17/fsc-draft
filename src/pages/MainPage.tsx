import React, { useState } from "react";
import { Box } from "@mui/material";
import SideNav from "../common/components/SideNav/SideNav";
import TopNav from "../common/components/TopNav/TopNav";
import InspectionScheduleContent from "../components/InspectionScheduleContent/InspectionScheduleContent";
import Dashboard from "../components/Dashboard/Dashboard";
import RotaCommanderView from "../components/RotaCommanderView/RotaCommanderView";
import { useAuth } from "../contexts/AuthContext";

const EnforcementOICContent: React.FC<{
  onAssignModeChange: (mode: boolean) => void;
}> = ({ onAssignModeChange }) => {
  return <InspectionScheduleContent onAssignModeChange={onAssignModeChange} />;
};

const RotaCommanderContent: React.FC = () => {
  return <RotaCommanderView />;
};

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

    return user?.role === "ENFORCEMENT_OIC" ? (
      <EnforcementOICContent onAssignModeChange={setIsAssignMode} />
    ) : (
      <RotaCommanderContent />
    );
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
