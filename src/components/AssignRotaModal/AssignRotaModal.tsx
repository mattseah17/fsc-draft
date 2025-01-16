import React from "react";
import {
  DialogContent,
  Select,
  MenuItem,
  Typography,
  Box,
  Avatar,
  Button,
  DialogActions,
} from "@mui/material";
import { BaseModal } from "../../common/components/BaseModal/BaseModal";
import { styles } from "./AssignRotaModal.styles";

interface AssignRotaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (rota: string) => void;
}

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
      title={
        <Box sx={styles.titleBox}>
          <Typography sx={styles.titleText}>Assign ROTA</Typography>
        </Box>
      }
      footer={
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!selectedRota}
            sx={styles.saveButton}
          >
            Save
          </Button>
        </DialogActions>
      }
      sx={{ "& .MuiDialog-paper": styles.modalPaper }}
    >
      <DialogContent sx={styles.dialogContent}>
        <Typography variant="subtitle1" gutterBottom>
          ROTA
        </Typography>
        <Select
          fullWidth
          value={selectedRota}
          displayEmpty
          onChange={(e) => setSelectedRota(e.target.value)}
          sx={styles.select}
          renderValue={(selected) => {
            if (selected === "") {
              return (
                <Typography color="text.secondary">Select ROTA</Typography>
              );
            }
            const rotaNumber = parseInt(selected.split(" ")[1]);
            return (
              <Box sx={styles.menuItem}>
                <Avatar sx={styles.avatar(rotaNumber)}>
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
              sx={styles.menuItem}
            >
              <Avatar sx={styles.avatar(number)}>{`R${number}`}</Avatar>
              {`ROTA ${number}`}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
    </BaseModal>
  );
};

export default AssignRotaModal;
