import React from "react";
import { Box, Typography, Avatar, Breadcrumbs, Link } from "@mui/material";

interface TopNavProps {
  page?: string;
}

const TopNav: React.FC<TopNavProps> = ({ page }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        width: "1301px",
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
      <Breadcrumbs
        separator=">"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            fontSize: "12px",
            color: "#757575",
          },
        }}
      >
        <Link
          href="#"
          sx={{
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#757575",
            textDecoration: "none",
          }}
        >
          Auto Scheduler
        </Link>
        {page && (
          <Typography
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "16px",
              color: "#212121",
            }}
          >
            {page}
          </Typography>
        )}
      </Breadcrumbs>
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
