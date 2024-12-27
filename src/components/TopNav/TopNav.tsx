import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const TopNav: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 1100,
        width: "1300px",
        height: "32px",
        minHeight: "32px",
        maxHeight: "32px",
        borderBottom: "1px solid #EEEEEE",
        padding: "16px 32px",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Noto Sans, sans-serif",
          fontWeight: 500,
          fontSize: "12px",
          lineHeight: "16px",
        }}
      >
        Auto Scheduler
      </Typography>
      <Avatar
        alt="User Avatar"
        src="/path/to/user/avatar.jpg"
        sx={{
          width: 24,
          height: 24,
          fontSize: 18,
        }}
      />
    </Box>
  );
};

export default TopNav;
