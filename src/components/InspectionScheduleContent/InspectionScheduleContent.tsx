import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  Avatar,
  Snackbar,
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import AddPremisesModal from "../AddPremisesModal/AddPremisesModal";
import { Premises } from "../../types/premises";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styles } from "./styles";
import AssignRotaModal from "../AssignRotaModal/AssignRotaModal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

interface InspectionScheduleContentProps {
  onAssignModeChange: (isAssignMode: boolean) => void;
}

const InspectionScheduleContent: React.FC<InspectionScheduleContentProps> = ({
  onAssignModeChange,
}) => {
  const [isAssignMode, setIsAssignMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [premises, setPremises] = useState<Premises[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newlyAddedCount, setNewlyAddedCount] = useState(0);
  const [showAssignToast, setShowAssignToast] = useState(false);
  const [assignMessage, setAssignMessage] = useState("");
  const [selectedPremises, setSelectedPremises] = useState<string[]>([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSavePremises = (newPremises: Premises[]) => {
    setPremises((prevPremises) => {
      const combinedPremises = [...prevPremises];
      let addedCount = 0;

      newPremises.forEach((newPremise) => {
        const exists = combinedPremises.some(
          (existing) =>
            existing.enforcementNumber === newPremise.enforcementNumber
        );

        if (!exists) {
          combinedPremises.push(newPremise);
          addedCount++;
        }
      });

      setNewlyAddedCount(addedCount);
      setShowToast(true);
      return combinedPremises;
    });
  };

  const handleDeletePremise = (enforcementNumber: string) => {
    setPremises(
      premises.filter((p) => p.enforcementNumber !== enforcementNumber)
    );
  };

  const handleEditMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAssignPremises = () => {
    setIsAssignMode(true);
    onAssignModeChange(true);
    handleEditMenuClose();
  };

  const getRotaColor = (rotaNumber: number) => {
    switch (rotaNumber) {
      case 1:
        return "#1976d2"; // Blue
      case 2:
        return "#7b1fa2"; // Purple
      case 3:
        return "#ed6c02"; // Orange
      default:
        return "#grey";
    }
  };

  const handleRotaAssignment = (enforcementNumber: string, rota: string) => {
    setPremises(
      premises.map((premise) =>
        premise.enforcementNumber === enforcementNumber
          ? { ...premise, assignedRota: rota }
          : premise
      )
    );
    if (rota) {
      setAssignMessage(`Premises assigned to ${rota}`);
      setShowAssignToast(true);
    }
  };

  const handleCheckboxChange = (enforcementNumber: string) => {
    setSelectedPremises((prev) =>
      prev.includes(enforcementNumber)
        ? prev.filter((id) => id !== enforcementNumber)
        : [...prev, enforcementNumber]
    );
  };

  const handleBulkAssign = (rota: string) => {
    setPremises(
      premises.map((premise) =>
        selectedPremises.includes(premise.enforcementNumber)
          ? { ...premise, assignedRota: rota }
          : premise
      )
    );

    setAssignMessage(`${selectedPremises.length} premises assigned to ${rota}`);
    setShowAssignToast(true);

    setSelectedPremises([]);
    setOpenAssignModal(false);
  };

  const getRotaPremisesCount = (rotaNumber: number) => {
    return premises.filter(
      (premise) => premise.assignedRota === `ROTA ${rotaNumber}`
    ).length;
  };

  const areAllPremisesAssigned = () => {
    return premises.every((premise) => premise.assignedRota);
  };

  const handleConfirmNotify = () => {
    setOpenConfirmModal(true);
  };

  const handleConfirmModalClose = () => {
    setOpenConfirmModal(false);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setOpenConfirmModal(false);
    setShowAssignToast(true);
    setAssignMessage("Notified ROTA Commander to verify premises availability");
    setIsAssignMode(false);
    onAssignModeChange(false);
  };

  return (
    <>
      <Box sx={styles.container}>
        {!isAssignMode && (
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Draft" />
              <Tab label="Finalised" />
            </Tabs>
          </Box>
        )}

        <Box sx={styles.statsContainer}>
          <Box sx={styles.statBox}>
            <ApartmentOutlinedIcon sx={{ fontSize: 24 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                {premises.length} / 39 Premises
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Sengkang Fire Station
              </Typography>
            </Box>
          </Box>

          {["ROTA 1", "ROTA 2", "ROTA 3"].map((rota, index) => (
            <Box key={rota} sx={styles.statBox}>
              <Avatar
                sx={{
                  bgcolor:
                    index === 0
                      ? "#1976d2"
                      : index === 1
                      ? "#7b1fa2"
                      : "#ed6c02",
                  width: 32,
                  height: 32,
                  fontSize: 18,
                }}
              >
                {`R${index + 1}`}
              </Avatar>
              <Box>
                <Typography variant="body2">
                  {getRotaPremisesCount(index + 1)} Premises
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {rota}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={() => styles.tableContainer({ isAssignMode })}>
          <Box sx={styles.table.title}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "21.79px",
                }}
              >
                {isAssignMode
                  ? "Assign Premises to ROTA"
                  : "Dec 2024 Inspection Schedule"}
              </Typography>
              {!isAssignMode && (
                <Tooltip
                  title={
                    <Typography
                      sx={{
                        fontFamily: "Noto Sans",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "19.07px",
                        textAlign: "left",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                      }}
                    >
                      Premises data and propensity scores refresh automatically
                      every month. It is recommended to start planning from the
                      21th of each month.
                    </Typography>
                  }
                  placement="right"
                  sx={{
                    cursor: "pointer",
                    "& .MuiTooltip-tooltip": {
                      width: "300px",
                      height: "100px",
                      padding: "12px 16px",
                      gap: "10px",
                      borderRadius: "8px",
                      backgroundColor: "#454545",
                      opacity: 1,
                    },
                  }}
                >
                  <InfoOutlinedIcon
                    sx={{
                      fontSize: 16,
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  />
                </Tooltip>
              )}
            </Box>
            {isAssignMode ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                {selectedPremises.length > 0 && (
                  <Button
                    variant="outlined"
                    onClick={() => setOpenAssignModal(true)}
                  >
                    Assign ROTA
                  </Button>
                )}
                <Button
                  variant="contained"
                  disabled={!areAllPremisesAssigned()}
                  onClick={handleConfirmNotify}
                >
                  Confirm & Notify
                </Button>
              </Box>
            ) : premises.length === 0 ? (
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                onClick={handleOpenModal}
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "21.79px",
                }}
              >
                Add Premises
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  startIcon={<BorderColorOutlinedIcon />}
                  endIcon={<ExpandMoreOutlinedIcon />}
                  variant="outlined"
                  onClick={handleEditMenuClick}
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21.79px",
                  }}
                >
                  Edit Schedule
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleEditMenuClose}
                  elevation={0}
                  sx={{
                    "& .MuiPaper-root": {
                      border: "1px solid #E0E0E0",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleOpenModal();
                      handleEditMenuClose();
                    }}
                    sx={{ gap: 1 }}
                  >
                    <AddIcon fontSize="small" />
                    Add Premises
                  </MenuItem>
                  <MenuItem onClick={handleAssignPremises} sx={{ gap: 1 }}>
                    <PersonAddAltIcon fontSize="small" />
                    Assign Premises
                  </MenuItem>
                </Menu>
                <Button
                  variant="contained"
                  disabled={!isConfirmed}
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21.79px",
                  }}
                >
                  Verify Schedule
                </Button>
              </Box>
            )}
          </Box>

          {premises.length === 0 ? (
            <Box sx={styles.emptyState}>
              <Box
                component="img"
                src="src/assets/empty_state.png"
                alt="Empty state illustration"
                sx={{ mb: 3, width: 200 }}
              />
              <Typography variant="h6" gutterBottom>
                Time to start planning your inspection schedule
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use data-driven insights to add recommended premises or search
                for targeted premises
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={styles.table.wrapper}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {isAssignMode && !isConfirmed ? (
                        <TableCell
                          padding="checkbox"
                          sx={styles.table.checkboxCell}
                        >
                          <Checkbox />
                        </TableCell>
                      ) : null}
                      <TableCell sx={styles.table.headerCell}>ROTA</TableCell>
                      {!isAssignMode && isConfirmed && (
                        <TableCell sx={styles.table.headerCell}>
                          Availability
                        </TableCell>
                      )}
                      <TableCell sx={styles.table.headerCell}>
                        Enforcement Number
                      </TableCell>
                      <TableCell sx={styles.table.headerCell}>
                        Premises Name
                      </TableCell>
                      <TableCell sx={styles.table.headerCell}>
                        Address
                      </TableCell>
                      <TableCell sx={styles.table.headerCell}>
                        Last Inspection Date
                      </TableCell>
                      <TableCell sx={styles.table.headerCell}>
                        Propensity Score
                      </TableCell>
                      <TableCell sx={styles.table.headerCell}>
                        HRI/POI
                      </TableCell>
                      <TableCell sx={styles.table.headerCell}>Origin</TableCell>
                      <TableCell sx={styles.table.headerCell}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {premises.map((premise) => (
                      <TableRow key={premise.enforcementNumber}>
                        {isAssignMode && !isConfirmed ? (
                          <TableCell
                            padding="checkbox"
                            sx={styles.table.checkboxCell}
                          >
                            <Checkbox
                              checked={selectedPremises.includes(
                                premise.enforcementNumber
                              )}
                              onChange={() =>
                                handleCheckboxChange(premise.enforcementNumber)
                              }
                            />
                          </TableCell>
                        ) : null}
                        <TableCell>
                          <Select
                            value={premise.assignedRota || ""}
                            displayEmpty
                            sx={{
                              minWidth: 120,
                              height: "26px",
                              fontSize: "12px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "none",
                                },
                            }}
                            onChange={(event) =>
                              handleRotaAssignment(
                                premise.enforcementNumber,
                                event.target.value
                              )
                            }
                            renderValue={(selected) => {
                              if (selected === "") {
                                return (
                                  <Typography
                                    color="text.secondary"
                                    sx={{ fontSize: "12px", color: "##1D1D1D" }}
                                  >
                                    Select ROTA
                                  </Typography>
                                );
                              }
                              const rotaNumber = parseInt(
                                selected.split(" ")[1]
                              );
                              return (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      fontSize: 12,
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
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    fontSize: 12,
                                    bgcolor: getRotaColor(number),
                                  }}
                                >
                                  {`R${number}`}
                                </Avatar>
                                {`ROTA ${number}`}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        {!isAssignMode && isConfirmed && (
                          <TableCell>
                            <Box
                              sx={{
                                width: "64px",
                                height: "24px",
                                padding: "4px 8px",
                                gap: "6px",
                                borderRadius: "4px",
                                backgroundColor: "#FFECCC",
                                color: "#953D00",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: 500,
                                lineHeight: "16.34px",
                              }}
                            >
                              Pending
                            </Box>
                          </TableCell>
                        )}
                        <TableCell sx={styles.table.cell}>
                          {premise.enforcementNumber}
                        </TableCell>
                        <TableCell sx={styles.table.cell}>
                          {premise.premisesName}
                        </TableCell>
                        <TableCell sx={styles.table.cell}>
                          {premise.address}
                        </TableCell>
                        <TableCell sx={styles.table.cell}>
                          {premise.lastInspectionDate}
                        </TableCell>
                        <TableCell sx={styles.table.cell}>
                          {premise.propensityScore}%
                        </TableCell>
                        <TableCell sx={styles.table.cell}>
                          {premise.hriPoi}
                        </TableCell>
                        <TableCell sx={styles.table.cell}>
                          {premise.origin}
                        </TableCell>
                        <TableCell sx={styles.table.cell}>
                          <IconButton
                            onClick={() =>
                              handleDeletePremise(premise.enforcementNumber)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box sx={styles.table.footer}>
                <Typography variant="caption" color="text.secondary">
                  {`1 - ${premises.length} of ${premises.length}`}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <AddPremisesModal
          open={openModal}
          onClose={handleCloseModal}
          onSave={handleSavePremises}
          existingPremises={premises}
          totalRequiredPremises={39}
        />

        <AssignRotaModal
          open={openAssignModal}
          onClose={() => setOpenAssignModal(false)}
          onSave={handleBulkAssign}
        />

        <Dialog
          open={openConfirmModal}
          onClose={handleConfirmModalClose}
          sx={{
            "& .MuiDialog-paper": {
              width: "440px",
              height: "196px",
              borderRadius: "16px",
              gap: "10px",
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>Confirm & Notify?</DialogTitle>
          <DialogContent
            sx={{
              pb: 3,
              overflowY: "hidden",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                lineHeight: "21.79px",
                fontWeight: 400,
              }}
            >
              Are you sure you want to notify the respective ROTA commander to
              verify the premises availability?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleConfirmModalClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Toast */}
        <Snackbar
          open={showToast}
          autoHideDuration={6000}
          onClose={() => setShowToast(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={styles.successAlert}>
            Added {newlyAddedCount}{" "}
            {newlyAddedCount === 1 ? "premise" : "premises"} to inspection
            schedule
          </Alert>
        </Snackbar>

        {/* Add new toast for assignment */}
        <Snackbar
          open={showAssignToast}
          autoHideDuration={3000}
          onClose={() => setShowAssignToast(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={styles.successAlert}>
            {assignMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default InspectionScheduleContent;
