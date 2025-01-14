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
import RoleSwitcher from "../../../components/RoleSwitcher/RoleSwitcher";
import { useAuth } from "../../../contexts/AuthContext";
import { styles } from "./TopNav.styles";

interface TopNavProps {
  page?: string;
}

const TopNav: React.FC<TopNavProps> = ({ page }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={styles.container}>
      <Breadcrumbs separator=">" sx={styles.breadcrumbs}>
        <Link href="#" sx={styles.breadcrumbLink}>
          Auto Scheduler
        </Link>
        {page && <Typography sx={styles.breadcrumbText}>{page}</Typography>}
      </Breadcrumbs>
      <Box sx={styles.userSection}>
        <RoleSwitcher />
        <Avatar
          alt={user?.name || "User"}
          src="/path/to/user/avatar.jpg"
          sx={styles.avatar}
          onClick={handleClick}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={styles.menu}
      >
        <Box sx={styles.menuHeader}>
          <Avatar sx={styles.menuAvatar}>{user?.name.charAt(0)}</Avatar>
          <Typography sx={styles.menuName}>{user?.name}</Typography>
          <Typography sx={styles.menuEmail}>{user?.email}</Typography>
        </Box>

        <Box sx={styles.menuContent}>
          <Box sx={styles.menuItem}>
            <PersonIcon sx={styles.menuIcon} />
            <Typography sx={styles.menuItemText}>
              {user?.role === "ROTA_COMMANDER"
                ? `${user.role} ${user.rotaNumber}`
                : user?.role}
            </Typography>
          </Box>
          <Box sx={styles.menuItem}>
            <LocationOnIcon sx={styles.menuIcon} />
            <Typography sx={styles.menuItemText}>
              Sengkang Fire Station
            </Typography>
          </Box>
          <Box sx={styles.logoutItem} onClick={handleClose}>
            <LogoutIcon sx={styles.menuIcon} />
            <Typography sx={styles.menuItemText}>Logout</Typography>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default TopNav;
