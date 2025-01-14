export const styles = {
  select: {
    minWidth: 120,
    fontSize: "12px",
    fontFamily: "Noto Sans, sans-serif",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  menuItem: {
    fontSize: "12px",
    width: "147px",
    height: "40px",
    padding: "8px 0px 0px 0px",
    gap: "10px",
    borderRadius: "var(--radius2)",
    opacity: 1,
  },
} as const;
