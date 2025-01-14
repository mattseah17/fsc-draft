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
import { styles } from "./SideNav.styles";

interface SideNavProps {
  onRouteChange: (route: "dashboard" | "scheduler") => void;
  currentRoute: "dashboard" | "scheduler";
}

const SideNav: React.FC<SideNavProps> = ({ onRouteChange, currentRoute }) => {
  return (
    <Drawer variant="permanent" sx={styles.drawer}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={styles.title}>
          <span>Fire</span>
          <span>Safety</span>
          <span>Co-pilot</span>
        </Typography>
      </Box>
      <List>
        <ListItemButton
          onClick={() => onRouteChange("scheduler")}
          selected={currentRoute === "scheduler"}
          sx={styles.listItemButton}
        >
          <ListItemIcon sx={styles.listIcon}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: 24, color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Auto Scheduler" sx={styles.listItemText} />
        </ListItemButton>
        
        <ListItemButton
          onClick={() => onRouteChange("dashboard")}
          selected={currentRoute === "dashboard"}
          sx={{ ...styles.listItemButton, ...styles.dashboardButton }}
        >
          <ListItemIcon sx={styles.listIcon}>
            <DashboardOutlinedIcon sx={{ fontSize: 24, color: "black" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={styles.listItemText} />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SideNav;
