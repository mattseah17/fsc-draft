import React from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

interface SideNavProps {
  onRouteChange: (route: "dashboard" | "scheduler") => void;
  currentRoute: "dashboard" | "scheduler";
}

const SideNav: React.FC<SideNavProps> = ({ onRouteChange, currentRoute }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "122px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "122px",
          height: "941px",
          boxSizing: "border-box",
          backgroundColor: "white",
          padding: "24px 18px",
          gap: "24px",
          borderRight: "1px solid #EEEEEE",
          borderTop: 0,
          borderBottom: 0,
          borderLeft: 0,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            width: "86px",
            height: "60px",
            fontFamily: "Faktum, sans-serif",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "20.08px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <span>Fire</span>
          <span>Safety</span>
          <span>Co-pilot</span>
        </Typography>
      </Box>
      <List>
        <ListItemButton
          onClick={() => onRouteChange("scheduler")}
          selected={currentRoute === "scheduler"}
          sx={{
            width: "86px",
            height: "74px",
            padding: "6px 0px 0px 0px",
            gap: "6px",
            borderRadius: "var(--radius4, 4px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "#E6F2FF",
              "& .MuiListItemText-primary": {
                color: "#056BD8",
              },
              "& .MuiListItemIcon-root svg": {
                color: "#056BD8",
              },
            },
            "&.Mui-selected": {
              backgroundColor: "#E6F2FF",
              "& .MuiListItemText-primary": {
                color: "#056BD8",
              },
              "& .MuiListItemIcon-root svg": {
                color: "#056BD8",
              },
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#E6F2FF",
              "& .MuiListItemText-primary": {
                color: "#056BD8",
              },
              "& .MuiListItemIcon-root svg": {
                color: "#056BD8",
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: 24, color: "black" }} />
          </ListItemIcon>
          <ListItemText
            primary="Auto Scheduler"
            primaryTypographyProps={{
              sx: {
                fontSize: "12px",
                textAlign: "center",
              },
            }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => onRouteChange("dashboard")}
          selected={currentRoute === "dashboard"}
          sx={{
            width: "86px",
            height: "58px",
            padding: "6px 0px 0px 0px",
            gap: "6px",
            borderRadius: "var(--radius4, 4px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "12px",
            "&:hover": {
              backgroundColor: "#E6F2FF",
              "& .MuiListItemText-primary": {
                color: "#056BD8",
              },
              "& .MuiListItemIcon-root svg": {
                color: "#056BD8",
              },
            },
            "&.Mui-selected": {
              backgroundColor: "#E6F2FF",
              "& .MuiListItemText-primary": {
                color: "#056BD8",
              },
              "& .MuiListItemIcon-root svg": {
                color: "#056BD8",
              },
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#E6F2FF",
              "& .MuiListItemText-primary": {
                color: "#056BD8",
              },
              "& .MuiListItemIcon-root svg": {
                color: "#056BD8",
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto" }}>
            <DashboardOutlinedIcon sx={{ fontSize: 24, color: "black" }} />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              sx: {
                fontSize: "12px",
                textAlign: "center",
              },
            }}
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SideNav;
