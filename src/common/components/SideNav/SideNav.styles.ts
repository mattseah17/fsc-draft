export const styles = {
  drawer: {
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
  },

  title: {
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
  },

  listItemButton: {
    width: "86px",
    height: "74px",
    padding: "6px",
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
  },

  dashboardButton: {
    marginTop: "12px",
    height: "58px",
    padding: "6px",
  },

  listIcon: {
    minWidth: "auto",
    padding: "3px 4px",
  },

  listItemText: {
    "& .MuiListItemText-primary": {
      fontSize: "12px",
      textAlign: "center",
    },
  },
} as const;
