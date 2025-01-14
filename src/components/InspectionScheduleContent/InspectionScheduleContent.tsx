import React, { useState, useRef } from "react";
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
import { Premise } from "../../types/premises";
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
import { usePremises } from "../../contexts/PremisesContext";
import { EmptyState } from "../../common/components/EmptyState/EmptyState";

interface InspectionScheduleContentProps {
  onAssignModeChange: (isAssignMode: boolean) => void;
}

const InspectionScheduleContent: React.FC<InspectionScheduleContentProps> = ({
  onAssignModeChange,
}) => {
  const [isAssignMode, setIsAssignMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const {
    premises,
    updatePremises,
    isPendingRotaVerification,
    setPendingRotaVerification,
  } = usePremises();
  const [showToast, setShowToast] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newlyAddedCount, setNewlyAddedCount] = useState(0);
  const [showAssignToast, setShowAssignToast] = useState(false);
  const [assignMessage, setAssignMessage] = useState("");
  const [selectedPremises, setSelectedPremises] = useState<string[]>([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSavePremises = (newPremises: Premise[]) => {
    updatePremises([
      ...premises,
      ...newPremises.filter(
        (newPremise) =>
          !premises.some(
            (existing) =>
              existing.enforcementNumber === newPremise.enforcementNumber
          )
      ),
    ]);

    setNewlyAddedCount(newPremises.length);
    setShowToast(true);
  };

  const handleDeletePremise = (enforcementNumber: string) => {
    updatePremises(
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

    // Scroll after state update
    setTimeout(() => {
      if (tableWrapperRef.current) {
        tableWrapperRef.current.scrollTop = 0;
      }
    }, 0);
  };

  const handleRotaAssignment = (enforcementNumber: string, rota: string) => {
    updatePremises(
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
    updatePremises(
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
    updatePremises(premises);
    setPendingRotaVerification(true);
    setOpenConfirmModal(false);
    setShowAssignToast(true);
    setAssignMessage("Notified ROTA Commander to verify premises availability");
    setIsAssignMode(false);
    onAssignModeChange(false);
  };

  const handleHeaderCheckboxChange = () => {
    if (selectedPremises.length > 0) {
      setSelectedPremises([]);
    } else {
      setSelectedPremises(premises.map((p) => p.enforcementNumber));
    }
  };

  const renderRotaCell = (premise: Premise) => {
    if (isAssignMode && !isPendingRotaVerification) {
      return (
        <Select
          value={premise.assignedRota || ""}
          displayEmpty
          sx={styles.rotaSelect}
          onChange={(event) =>
            handleRotaAssignment(premise.enforcementNumber, event.target.value)
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
            const rotaNumber = parseInt(selected.split(" ")[1]);
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar sx={styles.rotaAvatar(rotaNumber)}>
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
              <Avatar sx={styles.rotaAvatar(number)}>{`R${number}`}</Avatar>
              {`ROTA ${number}`}
            </MenuItem>
          ))}
        </Select>
      );
    }

    if (premise.assignedRota) {
      const rotaNumber = parseInt(premise.assignedRota.split(" ")[1]);
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar sx={styles.rotaAvatar(rotaNumber)}>{`R${rotaNumber}`}</Avatar>
          {premise.assignedRota}
        </Box>
      );
    }

    return null;
  };

  const getSortedPremises = () => {
    if (!isPendingRotaVerification) return premises;

    const availabilityOrder = {
      unavailable: 0,
      pending: 1,
      available: 2,
    };

    return [...premises].sort((a, b) => {
      const aStatus = a.availability || "pending";
      const bStatus = b.availability || "pending";
      return availabilityOrder[aStatus] - availabilityOrder[bStatus];
    });
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
                {isAssignMode && selectedPremises.length > 0
                  ? `${selectedPremises.length} Premises Selected`
                  : isAssignMode
                  ? "Assign Premises to ROTA"
                  : "Dec 2024 Inspection Schedule"}
              </Typography>
              {!isAssignMode && (
                <Tooltip
                  title={
                    <Typography
                      sx={{
                        ...styles.tooltipText,
                      }}
                    >
                      Premises data and propensity scores refresh automatically
                      every month. It is recommended to start planning from the
                      21th of each month.
                    </Typography>
                  }
                  placement="right"
                  sx={styles.tooltip}
                >
                  <InfoOutlinedIcon sx={styles.infoIcon} />
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
                  sx={styles.editMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleOpenModal();
                      handleEditMenuClose();
                    }}
                    sx={styles.menuItem}
                  >
                    <AddIcon fontSize="small" />
                    Add Premises
                  </MenuItem>
                  <MenuItem onClick={handleAssignPremises} sx={styles.menuItem}>
                    <PersonAddAltIcon fontSize="small" />
                    Assign Premises
                  </MenuItem>
                </Menu>
                <Button
                  variant="contained"
                  disabled={!isPendingRotaVerification}
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    lineHeight: "21.79px",
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }}
                >
                  Verify Schedule
                </Button>
              </Box>
            )}
          </Box>

          {premises.length === 0 ? (
            <EmptyState
              message="Time to start planning your inspection schedule"
              subMessage="Use data-driven insights to add recommended premises or search for targeted premises"
              sx={styles.emptyState}
            />
          ) : (
            <>
              <Box ref={tableWrapperRef} sx={styles.table.wrapper}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {isAssignMode && !isPendingRotaVerification ? (
                        <TableCell
                          padding="checkbox"
                          sx={styles.table.checkboxCell}
                        >
                          <Checkbox
                            indeterminate={selectedPremises.length > 0}
                            checked={
                              selectedPremises.length === premises.length
                            }
                            onChange={handleHeaderCheckboxChange}
                            sx={{
                              "&.Mui-indeterminate": {
                                color: "white",
                              },
                            }}
                          />
                        </TableCell>
                      ) : null}
                      {(isAssignMode ||
                        premises.some((p) => p.assignedRota)) && (
                        <TableCell sx={styles.table.headerCell}>ROTA</TableCell>
                      )}
                      {isPendingRotaVerification && (
                        <TableCell
                          sx={{
                            ...styles.table.headerCell,
                            paddingLeft: "16px",
                          }}
                        >
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
                    {getSortedPremises().map((premise) => (
                      <TableRow key={premise.enforcementNumber}>
                        {isAssignMode && !isPendingRotaVerification ? (
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
                        {(isAssignMode ||
                          premises.some((p) => p.assignedRota)) && (
                          <TableCell sx={styles.table.cell}>
                            {renderRotaCell(premise)}
                          </TableCell>
                        )}
                        {isPendingRotaVerification && (
                          <TableCell>
                            <Box
                              sx={{
                                ...styles.availabilityBox(
                                  premise.availability || "pending"
                                ),
                              }}
                            >
                              {premise.availability
                                ? premise.availability.charAt(0).toUpperCase() +
                                  premise.availability.slice(1)
                                : "Pending"}
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
          sx={styles.confirmDialog}
        >
          <DialogTitle sx={{ pb: 1, fontWeight: 600 }}>
            Confirm & Notify?
          </DialogTitle>
          <DialogContent sx={styles.confirmDialogContent}>
            <Typography sx={styles.confirmDialogText}>
              Are you sure you want to notify the respective ROTA commander to
              verify the premises availability?
            </Typography>
          </DialogContent>
          <DialogActions sx={styles.confirmDialogActions}>
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
          autoHideDuration={5000}
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
          autoHideDuration={5000}
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
