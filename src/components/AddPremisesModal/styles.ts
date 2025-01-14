export const styles = {
  dialog: {
    width: "1294px",
    height: "698px",
    maxWidth: "none",
    maxHeight: "none",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: 600,
    mb: 2,
  },
  tabContainer: {
    mb: 3,
    borderBottom: "1px solid #E0E0E0",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    mt: "auto",
    pt: 3,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "400px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #EEEEEE",
    borderRadius: "16px",
  },
} as const;
