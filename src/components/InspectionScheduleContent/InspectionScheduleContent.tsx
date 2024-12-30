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
import TopNav from "../TopNav/TopNav";

const InspectionScheduleContent: React.FC = () => {
  const [isAssignMode, setIsAssignMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [premises, setPremises] = useState<Premises[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newlyAddedCount, setNewlyAddedCount] = useState(0);

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
    handleEditMenuClose();
  };

  const renderTable = () => (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {isAssignMode && (
              <>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell sx={styles.table.headerCell}>ROTA</TableCell>
              </>
            )}
            <TableCell sx={styles.table.headerCell}>
              Enforcement Number
            </TableCell>
            <TableCell sx={styles.table.headerCell}>Premises Name</TableCell>
            <TableCell sx={styles.table.headerCell}>Address</TableCell>
            <TableCell sx={styles.table.headerCell}>
              Last Inspection Date
            </TableCell>
            <TableCell sx={styles.table.headerCell}>Propensity Score</TableCell>
            <TableCell sx={styles.table.headerCell}>HRI/POI</TableCell>
            <TableCell sx={styles.table.headerCell}>Origin</TableCell>
            <TableCell sx={styles.table.headerCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {premises.map((premise) => (
            <TableRow key={premise.enforcementNumber}>
              {isAssignMode && (
                <>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue=""
                      displayEmpty
                      sx={{ minWidth: 120 }}
                      renderValue={(selected) => {
                        if (selected === "") {
                          return (
                            <Typography color="text.secondary">
                              Select ROTA
                            </Typography>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select ROTA
                      </MenuItem>
                      <MenuItem value="ROTA 1">ROTA 1</MenuItem>
                      <MenuItem value="ROTA 2">ROTA 2</MenuItem>
                      <MenuItem value="ROTA 3">ROTA 3</MenuItem>
                    </Select>
                  </TableCell>
                </>
              )}
              <TableCell sx={styles.table.cell}>
                {premise.enforcementNumber}
              </TableCell>
              <TableCell sx={styles.table.cell}>
                {premise.premisesName}
              </TableCell>
              <TableCell sx={styles.table.cell}>{premise.address}</TableCell>
              <TableCell sx={styles.table.cell}>
                {premise.lastInspectionDate}
              </TableCell>
              <TableCell sx={styles.table.cell}>
                {premise.propensityScore}%
              </TableCell>
              <TableCell sx={styles.table.cell}>{premise.hriPoi}</TableCell>
              <TableCell sx={styles.table.cell}>{premise.origin}</TableCell>
              <TableCell sx={styles.table.cell}>
                <IconButton
                  onClick={() => handleDeletePremise(premise.enforcementNumber)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );

  return (
    <>
      <TopNav page={isAssignMode ? "Assign Premises" : undefined} />
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
                <Typography variant="body2">0 Premises</Typography>
                <Typography variant="caption" color="text.secondary">
                  {rota}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={styles.tableContainer}>
          <Box sx={styles.table.title}>
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
            {isAssignMode ? (
              <Button
                variant="contained"
                disabled
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "21.79px",
                }}
              >
                Confirm & Notify
              </Button>
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
                  disabled
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
              {renderTable()}
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
      </Box>
    </>
  );
};

export default InspectionScheduleContent;
