import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { usePremises } from "../../contexts/PremisesContext";
import { styles } from "../RotaCommanderView/styles";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { AvailabilityStatus } from "../../types/premises";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

const getAvailabilityStyle = (
  status: "available" | "unavailable" | "pending"
) => {
  switch (status) {
    case "available":
      return {
        backgroundColor: "#CEF8E0",
        color: "#007A4D",
      };
    case "unavailable":
      return {
        backgroundColor: "#FFEBE7",
        color: "#D31510",
      };
    case "pending":
    default:
      return {
        backgroundColor: "#FFECCC",
        color: "#953D00",
      };
  }
};

const RotaCommanderView: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showAvailabilityToast, setShowAvailabilityToast] = useState(false);
  const { user } = useAuth();
  const { premises, updatePremiseAvailability, updatePremises } = usePremises();

  const rotaPremises = premises.filter(
    (premise) => premise.assignedRota === `ROTA ${user?.rotaNumber}`
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleConfirmNotify = () => {
    setOpenConfirmModal(true);
  };

  const handleAvailabilityChange = (
    enforcementNumber: string,
    availability: "available" | "unavailable" | "pending"
  ) => {
    updatePremiseAvailability(enforcementNumber, availability);
    setShowAvailabilityToast(true);
  };

  const areAllPremisesAvailabilitySet = () => {
    return rotaPremises.every(
      (premise) =>
        premise.availability !== "pending" && premise.availability !== undefined
    );
  };

  const handleConfirmModalClose = () => {
    setOpenConfirmModal(false);
  };

  const handleConfirm = () => {
    updatePremises(premises);
    setOpenConfirmModal(false);
    setShowToast(true);
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
        return "grey";
    }
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Draft" />
            <Tab label="Finalised" />
          </Tabs>
        </Box>
        <Box sx={() => styles.tableContainer()}>
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
                Dec 2024 Inspection Schedule
              </Typography>
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
                    You can verify the premises availability by contacting the
                    premises' owner
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
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                disabled={
                  !areAllPremisesAvailabilitySet() || rotaPremises.length === 0
                }
                onClick={handleConfirmNotify}
              >
                Confirm & Notify
              </Button>
            </Box>
          </Box>
          {rotaPremises.length === 0 ? (
            <Box sx={styles.emptyState}>
              <Box
                component="img"
                src="src/assets/empty_state.png"
                alt="Empty state illustration"
                sx={{ mb: 3, width: 200 }}
              />
              <Typography variant="h6" gutterBottom>
                No premises assigned to you
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Let's wait for the premises to be assigned
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={styles.table.wrapper}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={styles.table.headerCell}>ROTA</TableCell>
                      <TableCell
                        sx={{
                          ...styles.table.headerCell,
                          paddingLeft: "40px",
                        }}
                      >
                        Availability
                      </TableCell>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rotaPremises.map((premise) => (
                      <TableRow key={premise.enforcementNumber}>
                        <TableCell sx={styles.table.cell}>
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
                                bgcolor: getRotaColor(
                                  parseInt(
                                    premise.assignedRota?.split(" ")[1] || "0"
                                  )
                                ),
                              }}
                            >
                              {`R${premise.assignedRota?.split(" ")[1]}`}
                            </Avatar>
                            {premise.assignedRota}
                          </Box>
                        </TableCell>
                        <TableCell sx={styles.table.cell}>
                          <Select
                            value={premise.availability || "pending"}
                            onChange={(e) =>
                              handleAvailabilityChange(
                                premise.enforcementNumber,
                                e.target.value as AvailabilityStatus
                              )
                            }
                            size="small"
                            sx={{
                              width: "120px",
                              height: "32px",
                              "& .MuiSelect-select": {
                                padding: "4px 8px",
                              },
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
                            renderValue={(value) => (
                              <Box
                                sx={{
                                  width: "69px",
                                  height: "16px",
                                  padding: "4px 4px",
                                  borderRadius: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "16.34px",
                                  gap: 0,
                                  ...getAvailabilityStyle(
                                    premise.availability || "pending"
                                  ),
                                }}
                              >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                              </Box>
                            )}
                          >
                            <MenuItem value="available">
                              <Box
                                sx={{
                                  width: "53px",
                                  height: "16px",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "16.34px",
                                  ...getAvailabilityStyle("available"),
                                }}
                              >
                                Available
                              </Box>
                            </MenuItem>
                            <MenuItem value="unavailable">
                              <Box
                                sx={{
                                  width: "76px",
                                  height: "16px",
                                  padding: "4px 5px",
                                  borderRadius: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "16.34px",
                                  ...getAvailabilityStyle("unavailable"),
                                }}
                              >
                                Unavailable
                              </Box>
                            </MenuItem>
                            <MenuItem value="pending">
                              <Box
                                sx={{
                                  width: "53px",
                                  height: "16px",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  lineHeight: "16.34px",
                                  ...getAvailabilityStyle("pending"),
                                }}
                              >
                                Pending
                              </Box>
                            </MenuItem>
                          </Select>
                        </TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
              <Box sx={styles.table.footer}>
                <Typography variant="caption" color="text.secondary">
                  {`1 - ${rotaPremises.length} of ${rotaPremises.length}`}
                </Typography>
              </Box>
            </>
          )}
        </Box>

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
              Are you sure you want to confirm the premises availability and
              notify Enforcement OIC?
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
      </Box>

      <Snackbar
        open={showAvailabilityToast}
        autoHideDuration={5000}
        onClose={() => setShowAvailabilityToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAvailabilityToast(false)}
          severity="success"
          sx={styles.successAlert}
        >
          Premises availability updated
        </Alert>
      </Snackbar>

      <Snackbar
        open={showToast}
        autoHideDuration={5000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="success"
          sx={styles.successAlert}
        >
          Confirmed premises availability and notified Enforcement OIC
        </Alert>
      </Snackbar>
    </>
  );
};

export default RotaCommanderView;
