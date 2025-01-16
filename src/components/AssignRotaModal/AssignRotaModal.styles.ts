import { SxProps, Theme } from "@mui/material";

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
  modalPaper: {
    width: "629px",
    height: "244px",
    padding: "20px",
    borderRadius: "16px",
  },
  titleBox: {
    width: "629px",
    height: "32px",
    display: "flex",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: "16px",
    fontWeight: "600",
  },
  dialogContent: {
    padding: "20px 0px",
  },
  cancelButton: {
    height: "40px",
    minWidth: "90px",
    padding: "14px 10px",
    gap: "10px",
    borderRadius: "8px",
    border: "none",
    color: "#595959",
  },
  saveButton: {
    height: "40px",
    minWidth: "90px",
    padding: "14px 16px",
    gap: "10px",
    borderRadius: "8px",
  },
  select: {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #E0E0E0",
    },
  },
  avatar: (rotaNumber: number): SxProps<Theme> => ({
    width: 24,
    height: 24,
    fontSize: 14,
    bgcolor: getRotaColor(rotaNumber),
  }),
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
} as const;
