import React from "react";
import {
  DialogContent,
  Select,
  MenuItem,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { BaseModal } from "../../common/components/BaseModal/BaseModal";

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
      setSelectedRota("");
    }
  };

  const handleClose = () => {
    setSelectedRota("");
    onClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Assign ROTA"
      onSave={handleSave}
      saveDisabled={!selectedRota}
    >
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
    </BaseModal>
  );
};

export default AssignRotaModal;
