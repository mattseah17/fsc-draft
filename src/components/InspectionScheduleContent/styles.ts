type TableContainerStyleProps = {
  isAssignMode?: boolean;
};

const getRotaColor = (rotaNumber: number) => {
  switch (rotaNumber) {
    case 1:
      return "#1976d2";
    case 2:
      return "#7b1fa2";
    case 3:
      return "#ed6c02";
    default:
      return "#grey";
  }
};

export const styles = {
  table: {
    title: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "11px 32px",
      borderBottom: "1px solid #EEEEEE",
      height: "40px",
      backgroundColor: "white",
      borderTopLeftRadius: "16px",
      borderTopRightRadius: "16px",
    },
    headerCell: {
      padding: "16px 32px",
      fontFamily: "Noto Sans, sans-serif",
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: "16.34px",
      textAlign: "left",
      borderBottom: "1px solid #EEEEEE",
      backgroundColor: "white",
      position: "sticky",
      top: 0,
      zIndex: 1,
      whiteSpace: "nowrap",
      "& .MuiTableCell-head": {
        textAlign: "left",
      },
    },
    cell: {
      padding: "8px 32px",
      whiteSpace: "nowrap",
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "16.34px",
    },
    checkboxCell: {
      padding: "0 0 0 32px",
    },
    wrapper: {
      flex: 1,
      overflow: "auto",
      "& .MuiTable-root": {
        minWidth: "1200px",
      },
    },
    footer: {
      display: "flex",
      alignItems: "center",
      height: "25px",
      padding: "16px 32px",
      borderTop: "1px solid #EEEEEE",
      backgroundColor: "white",
      borderBottomLeftRadius: "16px",
      borderBottomRightRadius: "16px",
    },
  },
  container: {
    padding: "32px",
  },
  statsContainer: {
    display: "flex",
    gap: 2,
    mb: 4,
  },
  statBox: {
    flex: 1,
    p: 2,
    border: "1px solid #e0e0e0",
    borderRadius: 1,
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  tableContainer: (props: TableContainerStyleProps = {}) => ({
    border: "1px solid #e0e0e0",
    borderRadius: "16px",
    width: "100%",
    height: props.isAssignMode ? "550px" : "454px",
    display: "flex",
    flexDirection: "column" as const,
  }),
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    py: 8,
    textAlign: "center",
    height: "300px",
  },
  successAlert: {
    backgroundColor: "#CEF8E0",
    color: "#00653E",
    border: "1px solid #00653E",
    borderRadius: "16px",
    "& .MuiAlert-icon": { color: "#00653E" },
  },
  rotaAvatar: (rotaNumber: number) => ({
    width: 20,
    height: 20,
    fontSize: 12,
    bgcolor: getRotaColor(rotaNumber),
  }),
  rotaSelect: {
    minWidth: 120,
    height: "26px",
    fontSize: "12px",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
  },
  tooltip: {
    cursor: "pointer",
    "& .MuiTooltip-tooltip": {
      width: "300px",
      height: "100px",
      padding: "12px 16px",
      gap: "10px",
      borderRadius: "8px",
      backgroundColor: "#454545",
      opacity: 1,
      "& .MuiTypography-root": {
        fontFamily: "Noto Sans, sans-serif",
      },
    },
  },
  tooltipText: {
    fontFamily: "Noto Sans",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "19.07px",
    textAlign: "left",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  },
  infoIcon: {
    fontSize: 16,
    color: "text.secondary",
    "&:hover": {
      color: "primary.main",
    },
  },
  confirmDialog: {
    "& .MuiDialog-paper": {
      width: "440px",
      height: "196px",
      borderRadius: "16px",
      
    },
  },
  confirmDialogContent: {
    pb: 3,
    overflowY: "hidden",
  },
  confirmDialogText: {
    fontSize: "15px",
    lineHeight: "21.79px",
    fontWeight: 400,
  },
  confirmDialogActions: {
    padding: "16px 20px",
  },
  availabilityBox: (status: string) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width:
      status === "pending" ? "48px" : status === "available" ? "53px" : "68px",
    height: "24px",
    padding: "4px 8px",
    gap: "6px",
    borderRadius: "4px",
    backgroundColor:
      status === "pending"
        ? "#FFECCC"
        : status === "available"
        ? "#CEF8E0"
        : "#FFEBE7",
    color:
      status === "pending"
        ? "#953D00"
        : status === "available"
        ? "#007A4D"
        : "#D31510",
    fontFamily: "Noto Sans",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "16.34px",
    textAlign: "center",
    textUnderlinePosition: "from-font",
    textDecorationSkipInk: "none",
  }),
  editMenu: {
    "& .MuiPaper-root": {
      border: "1px solid #E0E0E0",
    },
  },
  menuItem: {
    gap: 1,
  },
};
