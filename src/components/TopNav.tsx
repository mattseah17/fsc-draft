import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const TopNav: React.FC = () => {
  return (
    <Box
      sx={{
        width: "1318px",
        height: "33px",
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
          lineHeight: "16.34spx",
        }}
      >
        Auto Scheduler
      </Typography>
      <Avatar
        alt="User Avatar"
        src="/path/to/user/avatar.jpg" // Replace with actual image path
        sx={{
          width: 32,
          height: 32,
        }}
      />
    </Box>
  );
};

export default TopNav;
