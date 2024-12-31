import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Breadcrumbs,
  Link,
  Menu,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

interface TopNavProps {
  page?: string;
}

const TopNav: React.FC<TopNavProps> = ({ page }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          width: 32,
          height: 32,
          fontSize: 12,
          cursor: "pointer",
        }}
        onClick={handleClick}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            width: "224px",
            borderRadius: "8px",
            border: "1px solid #EEEEEE",
            mt: 1,
          },
        }}
      >
        <Box
          sx={{
            p: "20px 0 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderBottom: "1px solid #EEEEEE",
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              mb: 1,
              bgcolor: "#1976D2",
            }}
          >
            U
          </Avatar>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              mb: 0.5,
            }}
          >
            User Full Name
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#757575",
              mb: 0.5,
            }}
          >
            firstname_lastname@scdf.gov.sg
          </Typography>
        </Box>

        <Box
          sx={{
            py: "12px",
            px: "12px",
            gap: "12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon sx={{ fontSize: 20, color: "#454545" }} />
            <Typography sx={{ fontSize: "12px", padding: "4px 20px" }}>
              Enforcement OIC
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 20, color: "#454545" }} />
            <Typography sx={{ fontSize: "12px", padding: "4px 20px" }}>
              Sengkang Fire Station
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              "&:hover": {
                color: "#1976D2",
              },
            }}
            onClick={handleClose}
          >
            <LogoutIcon sx={{ fontSize: 20, color: "#454545" }} />
            <Typography sx={{ fontSize: "12px", padding: "4px 20px" }}>
              Logout
            </Typography>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default TopNav;
