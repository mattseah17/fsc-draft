// Create a type for dynamic styles
type TableContainerStyleProps = {
  isAssignMode?: boolean;
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
      textAlign: "left" as const,
      borderBottom: "1px solid #EEEEEE",
      backgroundColor: "white",
      position: "sticky" as const,
      top: 0,
      zIndex: 1,
      whiteSpace: "nowrap",
    },
    cell: {
      padding: "16px 32px",
      whiteSpace: "nowrap",
    },
    checkboxCell: {
      padding: "16px 0 16px 32px",
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
    height: props.isAssignMode ? "550px" : "465px",
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
};
