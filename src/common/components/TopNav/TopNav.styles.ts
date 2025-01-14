export const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: "128px",
    right: 0,
    height: "32px",
    minHeight: "32px",
    maxHeight: "32px",
    borderBottom: "1px solid #EEEEEE",
    padding: {
      xs: "16px",
      sm: "16px 32px",
    },
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1100,
    overflow: "visible",
  },
  breadcrumbs: {
    "& .MuiBreadcrumbs-separator": {
      fontSize: "12px",
      color: "#757575",
    },
    "& .MuiBreadcrumbs-ol": {
      flexWrap: "nowrap",
    },
    "& .MuiBreadcrumbs-li": {
      minWidth: 0,
    },
  },
  breadcrumbLink: {
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#757575",
    textDecoration: "none",
  },
  breadcrumbText: {
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#212121",
  },
  userSection: {
    display: "flex",
    gap: { xs: 1, sm: 1 },
    alignItems: "center",
    ml: "auto",
    minWidth: "fit-content",
  },
  avatar: {
    width: 32,
    height: 32,
    fontSize: 12,
    cursor: "pointer",
  },
  menu: {
    "& .MuiPaper-root": {
      width: "224px",
      borderRadius: "8px",
      border: "1px solid #EEEEEE",
      mt: 1,
    },
  },
  menuHeader: {
    p: "20px 0 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: "1px solid #EEEEEE",
  },
  menuAvatar: {
    width: 40,
    height: 40,
    mb: 1,
    bgcolor: "#1976D2",
  },
  menuName: {
    fontSize: "12px",
    fontWeight: 500,
    mb: 0.5,
  },
  menuEmail: {
    fontSize: "12px",
    color: "#454545",
    mb: 0.5,
  },
  menuContent: {
    py: "12px",
    px: "12px",
    gap: "12px",
    display: "flex",
    flexDirection: "column",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  menuItemText: {
    fontSize: "12px",
    padding: "4px 20px",
  },
  logoutItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    cursor: "pointer",
    "&:hover": {
      color: "#1976D2",
    },
  },
  menuIcon: {
    fontSize: 20,
    color: "#454545",
  },
} as const;
