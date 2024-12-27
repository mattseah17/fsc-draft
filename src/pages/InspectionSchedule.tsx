import React from "react";
import { Box } from "@mui/material";
import SideNav from "../components/SideNav/SideNav";
import TopNav from "../components/TopNav/TopNav";
import InspectionScheduleContent from "../components/InspectionScheduleContent/InspectionScheduleContent";

const InspectionSchedule: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <SideNav />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <TopNav />
        <InspectionScheduleContent />
      </Box>
    </Box>
  );
};

export default InspectionSchedule;
