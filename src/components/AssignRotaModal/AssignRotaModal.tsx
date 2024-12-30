import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

interface AssignRotaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (rota: string) => void;
}

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

const AssignRotaModal: React.FC<AssignRotaModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [selectedRota, setSelectedRota] = React.useState("");

  const handleSave = () => {
    if (selectedRota) {
      onSave(selectedRota);
      setSelectedRota(""); // Reset selection after save
    }
  };

  const handleClose = () => {
    setSelectedRota(""); // Reset selection when modal closes
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { borderRadius: "16px", width: "629px", gap: "10px" },
      }}
    >
      <DialogTitle>Assign ROTA</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          ROTA
        </Typography>
        <Select
          fullWidth
          value={selectedRota}
          displayEmpty
          onChange={(e) => setSelectedRota(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #E0E0E0",
            },
          }}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <Typography color="text.secondary">Select ROTA</Typography>
              );
            }
            const rotaNumber = parseInt(selected.split(" ")[1]);
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: 14,
                    bgcolor: getRotaColor(rotaNumber),
                  }}
                >
                  {`R${rotaNumber}`}
                </Avatar>
                {selected}
              </Box>
            );
          }}
        >
          <MenuItem value="">Select ROTA</MenuItem>
          {[1, 2, 3].map((number) => (
            <MenuItem
              key={number}
              value={`ROTA ${number}`}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: 14,
                  bgcolor: getRotaColor(number),
                }}
              >
                {`R${number}`}
              </Avatar>
              {`ROTA ${number}`}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!selectedRota}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignRotaModal;
