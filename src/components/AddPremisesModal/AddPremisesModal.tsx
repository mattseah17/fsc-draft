import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Autocomplete,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { dummyPremises } from "../../data/dummyPremises";
import { Premises } from "../../types/premises";
import { dummyRecommendedPremises } from "../../data/dummyRecommendedPremises";
import emptyStateImage from "../../assets/empty_state.png";

interface AddPremisesModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (premises: Premises[]) => void;
  existingPremises: Premises[];
  totalRequiredPremises: number;
}

const tableStyles = {
  title: {
    padding: "11px 32px",
    backgroundColor: "#FFFFFF",
    borderTop: "1px solid #EEEEEE",
    borderBottom: "1px solid #EEEEEE",
    borderLeft: "1px solid #EEEEEE",
    borderRight: "1px solid #EEEEEE",
    width: "1190px",
    height: "40px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    display: "flex",
    alignItems: "center",
  },
  headerAndContent: {
    backgroundColor: "#FFFFFF",
    borderLeft: "1px solid #EEEEEE",
    borderRight: "1px solid #EEEEEE",
    width: "1254px",
    minHeight: "62px",
  },
  footer: {
    padding: "16px 32px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #EEEEEE",
    borderLeft: "1px solid #EEEEEE",
    borderRight: "1px solid #EEEEEE",
    width: "1190px",
    height: "26px",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  },
  cell: {
    padding: "8px",
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "16.34px",
    textAlign: "left" as const,
    textUnderlinePosition: "from-font" as const,
    textDecorationSkipInk: "none" as const,
  },
  headerCell: {
    padding: "8px",
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "16.34px",
    textAlign: "left" as const,
    textUnderlinePosition: "from-font" as const,
    textDecorationSkipInk: "none" as const,
    borderBottom: "1px solid #EEEEEE",
  },
};

type OriginType =
  | "Ops Survey"
  | "Cert Audit"
  | "HRI Exercise"
  | "Outside Drill"
  | "Adhoc";

const AddPremisesModal: React.FC<AddPremisesModalProps> = ({
  open,
  onClose,
  onSave,
  existingPremises,
  totalRequiredPremises,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPremises, setSelectedPremises] = useState<Premises[]>([]);
  const [filteredPremises, setFilteredPremises] = useState<Premises[]>([]);
  const originOptions = [
    "Ops Survey",
    "Cert Audit",
    "HRI Exercise",
    "Outside Drill",
    "Adhoc",
  ];

  const availablePremises = filteredPremises.filter(
    (premise) =>
      !selectedPremises.some(
        (selected) => selected.enforcementNumber === premise.enforcementNumber
      ) &&
      !existingPremises.some(
        (existing) => existing.enforcementNumber === premise.enforcementNumber
      )
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSearchQuery("");
    setFilteredPremises([]);
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredPremises([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = dummyPremises.filter(
      (premise) =>
        premise.enforcementNumber.toLowerCase().includes(query) ||
        premise.premisesName.toLowerCase().includes(query) ||
        premise.address.toLowerCase().includes(query)
    );
    setFilteredPremises(filtered);
  }, [searchQuery]);

  const handleOriginChange = (premiseId: string, newOrigin: OriginType) => {
    setSelectedPremises((prevPremises) =>
      prevPremises.map((premise) =>
        premise.enforcementNumber === premiseId
          ? { ...premise, origin: newOrigin }
          : premise
      )
    );
  };

  const handleSave = () => {
    // Get recommended premises that should be automatically selected
    const recommendedToAdd =
      tabValue === 1
        ? dummyRecommendedPremises
            .slice(0, remainingPremisesNeeded)
            .filter(
              (premise) =>
                !selectedPremises.some(
                  (p) => p.enforcementNumber === premise.enforcementNumber
                )
            )
        : [];

    // Combine manually selected premises with recommended ones
    const premisesToSave = [...selectedPremises, ...recommendedToAdd];

    onSave(premisesToSave);
    setSelectedPremises([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedPremises([]);
    setSearchQuery("");
    setFilteredPremises([]);
    setTabValue(0);
    onClose();
  };

  const handleAutocompleteSelect = (selectedPremise: Premises | null) => {
    if (selectedPremise) {
      if (
        !selectedPremises.some(
          (p) => p.enforcementNumber === selectedPremise.enforcementNumber
        )
      ) {
        setSelectedPremises([...selectedPremises, selectedPremise]);
      }
      setSearchQuery("");
      setFilteredPremises([]);
    }
  };

  const areAllVisiblePremisesSelected = (visiblePremises: Premises[]) => {
    if (visiblePremises.length === 0) return false;
    return visiblePremises.every((premise) =>
      selectedPremises.some(
        (p) => p.enforcementNumber === premise.enforcementNumber
      )
    );
  };

  const handleHeaderCheckboxChange = (visiblePremises: Premises[]) => {
    if (areAllVisiblePremisesSelected(visiblePremises)) {
      setSelectedPremises(
        selectedPremises.filter(
          (selected) =>
            !visiblePremises.some(
              (visible) =>
                visible.enforcementNumber === selected.enforcementNumber
            )
        )
      );
    } else {
      const newPremises = visiblePremises.filter(
        (premise) =>
          !selectedPremises.some(
            (p) => p.enforcementNumber === premise.enforcementNumber
          )
      );
      setSelectedPremises([...selectedPremises, ...newPremises]);
    }
  };

  const remainingPremisesNeeded =
    totalRequiredPremises - (existingPremises.length + selectedPremises.length);

  const renderSearchTable = () => (
    <Box sx={{ mt: 3, mb: 3, width: "1254px" }}>
      {selectedPremises.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableStyles.headerCell}>
                <Checkbox
                  checked={areAllVisiblePremisesSelected(selectedPremises)}
                  onChange={() => handleHeaderCheckboxChange(selectedPremises)}
                />
              </TableCell>
              <TableCell sx={tableStyles.headerCell}>
                Enforcement Number
              </TableCell>
              <TableCell sx={tableStyles.headerCell}>Premises Name</TableCell>
              <TableCell sx={tableStyles.headerCell}>Address</TableCell>
              <TableCell sx={tableStyles.headerCell}>
                Last Inspection Date
              </TableCell>
              <TableCell sx={tableStyles.headerCell}>
                Propensity Score
              </TableCell>
              <TableCell sx={tableStyles.headerCell}>HRI/POI</TableCell>
              <TableCell sx={tableStyles.headerCell}>Origin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedPremises.map((premise) => (
              <TableRow key={premise.enforcementNumber}>
                <TableCell sx={tableStyles.cell}>
                  <Checkbox
                    checked={selectedPremises.some(
                      (p) => p.enforcementNumber === premise.enforcementNumber
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPremises([...selectedPremises, premise]);
                      } else {
                        setSelectedPremises(
                          selectedPremises.filter(
                            (p) =>
                              p.enforcementNumber !== premise.enforcementNumber
                          )
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell sx={tableStyles.cell}>
                  {premise.enforcementNumber}
                </TableCell>
                <TableCell sx={tableStyles.cell}>
                  {premise.premisesName}
                </TableCell>
                <TableCell sx={tableStyles.cell}>{premise.address}</TableCell>
                <TableCell sx={tableStyles.cell}>
                  {premise.lastInspectionDate}
                </TableCell>
                <TableCell sx={tableStyles.cell}>
                  {premise.propensityScore}%
                </TableCell>
                <TableCell sx={tableStyles.cell}>{premise.hriPoi}</TableCell>
                <TableCell sx={tableStyles.cell}>
                  <Select
                    defaultValue={premise.origin || originOptions[0]}
                    size="small"
                    onChange={(event) =>
                      handleOriginChange(
                        premise.enforcementNumber,
                        event.target.value as OriginType
                      )
                    }
                    sx={{
                      minWidth: 120,
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
                    }}
                    renderValue={(selected) => (
                      <Typography
                        sx={{
                          fontFamily: "Noto Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: "16.34px",
                        }}
                      >
                        {selected}
                      </Typography>
                    )}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root": {
                            padding: 0,
                            fontFamily: "Noto Sans, sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: "16.34px",
                          },
                        },
                      },
                    }}
                  >
                    {originOptions.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "171px",
                          fontFamily: "Noto Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: "16.34px",
                        }}
                      >
                        <Checkbox
                          checked={
                            option === (premise.origin || originOptions[0])
                          }
                          sx={{ marginRight: 1 }}
                        />
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : searchQuery ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #EEEEEE",
            borderRadius: "16px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#757575",
            }}
          >
            No matching results found
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #EEEEEE",
            borderRadius: "16px",
          }}
        >
          <img src={emptyStateImage} alt="Empty state" />
          <Typography
            sx={{
              mt: 2,
              fontFamily: "Noto Sans, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#757575",
            }}
          >
            Please try searching by address, enforcement number or premises name
          </Typography>
        </Box>
      )}
    </Box>
  );

  const renderRecommendTable = () => (
    <Box sx={{ mt: 3, mb: 3, width: "1254px" }}>
      <Box sx={tableStyles.title}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "21.79px",
          }}
        >
          {`${remainingPremisesNeeded} Premises Recommended`}
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableStyles.headerCell}>
              <Checkbox
                checked={areAllVisiblePremisesSelected(
                  dummyRecommendedPremises
                )}
                onChange={() =>
                  handleHeaderCheckboxChange(dummyRecommendedPremises)
                }
              />
            </TableCell>
            <TableCell sx={tableStyles.headerCell}>
              Enforcement Number
            </TableCell>
            <TableCell sx={tableStyles.headerCell}>Premises Name</TableCell>
            <TableCell sx={tableStyles.headerCell}>Address</TableCell>
            <TableCell sx={tableStyles.headerCell}>
              Last Inspection Date
            </TableCell>
            <TableCell sx={tableStyles.headerCell}>Propensity Score</TableCell>
            <TableCell sx={tableStyles.headerCell}>HRI/POI</TableCell>
            <TableCell sx={tableStyles.headerCell}>Origin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyRecommendedPremises.map((premise, index) => (
            <TableRow key={premise.enforcementNumber}>
              <TableCell sx={tableStyles.cell}>
                <Checkbox
                  checked={
                    selectedPremises.some(
                      (p) => p.enforcementNumber === premise.enforcementNumber
                    ) || index < remainingPremisesNeeded
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPremises([...selectedPremises, premise]);
                    } else {
                      setSelectedPremises(
                        selectedPremises.filter(
                          (p) =>
                            p.enforcementNumber !== premise.enforcementNumber
                        )
                      );
                    }
                  }}
                />
              </TableCell>
              <TableCell sx={tableStyles.cell}>
                {premise.enforcementNumber}
              </TableCell>
              <TableCell sx={tableStyles.cell}>
                {premise.premisesName}
              </TableCell>
              <TableCell sx={tableStyles.cell}>{premise.address}</TableCell>
              <TableCell sx={tableStyles.cell}>
                {premise.lastInspectionDate}
              </TableCell>
              <TableCell sx={tableStyles.cell}>
                {premise.propensityScore}%
              </TableCell>
              <TableCell sx={tableStyles.cell}>{premise.hriPoi}</TableCell>
              <TableCell sx={tableStyles.cell}>
                <Select
                  defaultValue={premise.origin || originOptions[0]}
                  size="small"
                  onChange={(event) =>
                    handleOriginChange(
                      premise.enforcementNumber,
                      event.target.value as OriginType
                    )
                  }
                  sx={{
                    minWidth: 120,
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
                  }}
                  renderValue={(selected) => (
                    <Typography
                      sx={{
                        fontFamily: "Noto Sans, sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16.34px",
                      }}
                    >
                      {selected}
                    </Typography>
                  )}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root": {
                          padding: 0,
                          fontFamily: "Noto Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          lineHeight: "16.34px",
                        },
                      },
                    },
                  }}
                >
                  {originOptions.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "171px",
                        fontFamily: "Noto Sans, sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        lineHeight: "16.34px",
                      }}
                    >
                      <Checkbox
                        checked={
                          option === (premise.origin || originOptions[0])
                        }
                        sx={{ marginRight: 1 }}
                      />
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "1294px",
          height: "698px",
          maxWidth: "none",
          maxHeight: "none",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Add Premises</Typography>
          <Button onClick={onClose}>
            <ClearIcon sx={{ color: "black" }} />
          </Button>
        </Box>

        <Box sx={{ mb: 3, borderBottom: "1px solid #E0E0E0" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Search" />
            <Tab label="Recommend" />
          </Tabs>
        </Box>

        {tabValue === 0 ? (
          <>
            <Autocomplete
              fullWidth
              freeSolo
              options={availablePremises}
              filterOptions={(x) => x}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.premisesName
              }
              noOptionsText="No matching results found"
              value={null}
              inputValue={searchQuery}
              onInputChange={(event, newInputValue) => {
                setSearchQuery(newInputValue);
              }}
              sx={{
                width: "480px",
                height: "40px",
                "& .MuiInputBase-root": {
                  height: "40px",
                  padding: "14px 16px",
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search address, enforcement no, premises name"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box>
                    <Typography variant="subtitle1">
                      {option.premisesName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.address}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {option.enforcementNumber}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last Inspection: {option.lastInspectionDate}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.hriPoi}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
              onChange={(event, newValue) => {
                handleAutocompleteSelect(newValue as Premises | null);
              }}
            />
            {renderSearchTable()}
          </>
        ) : (
          <>{renderRecommendTable()}</>
        )}

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddPremisesModal;
