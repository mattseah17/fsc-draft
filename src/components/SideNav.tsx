import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const SideNav: React.FC = () => {
  return (
    <Box
      sx={{
        width: "122px",
        height: "941px",
        borderRight: "1px solid #EEEEEE",
        padding: "24px 18px",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          width: "86px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Faktum, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "20.08px",
            textAlign: "left",
          }}
        >
          Fire
          <br />
          Safety
          <br />
          Co-pilot
        </Typography>
      </Box>

      <List
        sx={{
          width: "86px",
          height: "144px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <ListItem
          component="button"
          sx={{
            width: "86px",
            height: "74px",
            padding: "15px 6px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            border: "none",
            "&:hover, &:focus": {
              backgroundColor: "#E6F2FF",
              borderRadius: "8px",
              "& .MuiListItemText-root": {
                color: "#056BD8",
              },
              "& .MuiListItemIcon-root": {
                color: "#056BD8",
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "auto",
              color: "black",
              padding: "3px",
            }}
          >
            <CalendarTodayIcon
              sx={{ fontSize: "18px", padding: "3px", marginTop: "8px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Auto Scheduler"
            sx={{
              ".MuiTypography-root": {
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "16.34px",
                paddingBottom: "6px",
                width: "74px",
                height: "32px",
              },
            }}
          />
        </ListItem>

        <ListItem
          component="button"
          sx={{
            width: "86px",
            height: "58px",
            padding: "15px 6px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            border: "none",
            "&:hover, &:focus": {
              backgroundColor: "#E6F2FF",
              borderRadius: "8px",
              "& .MuiListItemText-root": {
                color: "#056BD8",
              },
              "& .MuiListItemIcon-root": {
                color: "#056BD8",
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "auto",
              color: "black",
              padding: "3px",
            }}
          >
            <DashboardOutlinedIcon
              sx={{ fontSize: "18px", padding: "3px", marginTop: "8px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{
              ".MuiTypography-root": {
                fontFamily: "Noto Sans, sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "16.34px",
                paddingBottom: "6px",
                width: "74px",
                height: "16px",
              },
            }}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideNav;
