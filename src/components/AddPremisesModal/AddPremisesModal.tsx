import React, { useState, useMemo } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { dummyPremises } from "../../data/dummyPremises";
import { Premises } from "../../types/premises";

interface AddPremisesModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (premises: Premises[]) => void;
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
    border: "1px solid #EEEEEE",
    width: "1254px",
    minHeight: "62px",
  },
  footer: {
    padding: "16px 32px",
    backgroundColor: "#FFFFFF",
    borderTop: "1px solid #EEEEEE",
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
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPremises, setSelectedPremises] = useState<Premises[]>([]);
  const originOptions = [
    "Ops Survey",
    "Cert Audit",
    "HRI Exercise",
    "Outside Drill",
    "Adhoc",
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredPremises = useMemo(() => {
    if (!searchQuery) return [];

    const query = searchQuery.toLowerCase();
    return dummyPremises.filter(
      (premise) =>
        premise.enforcementNumber.toLowerCase().includes(query) ||
        premise.premisesName.toLowerCase().includes(query) ||
        premise.address.toLowerCase().includes(query)
    );
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
    onSave(selectedPremises);
    setSelectedPremises([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedPremises([]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "1294px",
          height: "auto",
          maxHeight: "698px",
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

        <Box sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Search" />
            <Tab label="Recommend" />
          </Tabs>
        </Box>

        <Autocomplete
          fullWidth
          freeSolo
          options={filteredPremises}
          filterOptions={(x) => x}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.premisesName
          }
          noOptionsText="No matching results found"
          value={null}
          onChange={(event, newValue: string | Premises | null) => {
            if (newValue && typeof newValue !== "string") {
              const isDuplicate = selectedPremises.some(
                (p) => p.enforcementNumber === newValue.enforcementNumber
              );
              if (!isDuplicate) {
                setSelectedPremises([...selectedPremises, newValue]);
              }
            }
          }}
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
        />

        {selectedPremises.length > 0 ? (
          <Box sx={{ mt: 3, mb: 3 }}>
            <Box sx={tableStyles.title}>
              <Typography variant="subtitle2" fontSize={16}>
                {selectedPremises.length}{" "}
                {selectedPremises.length === 1 ? "Premise" : "Premises"}{" "}
                Selected
              </Typography>
            </Box>

            <Box sx={tableStyles.headerAndContent}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={tableStyles.headerCell}>
                      <Checkbox checked={true} />
                    </th>
                    <th style={tableStyles.headerCell}>Enforcement Number</th>
                    <th style={tableStyles.headerCell}>Premises Name</th>
                    <th style={tableStyles.headerCell}>Address</th>
                    <th style={tableStyles.headerCell}>Last Inspection Date</th>
                    <th style={tableStyles.headerCell}>Propensity Score</th>
                    <th style={tableStyles.headerCell}>HRI/POI</th>
                    <th style={tableStyles.headerCell}>Origin</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPremises.map((premise) => (
                    <tr key={premise.enforcementNumber}>
                      <td style={tableStyles.cell}>
                        <Checkbox checked={true} />
                      </td>
                      <td style={tableStyles.cell}>
                        {premise.enforcementNumber}
                      </td>
                      <td style={tableStyles.cell}>{premise.premisesName}</td>
                      <td style={tableStyles.cell}>{premise.address}</td>
                      <td style={tableStyles.cell}>
                        {premise.lastInspectionDate}
                      </td>
                      <td style={tableStyles.cell}>
                        {premise.propensityScore}%
                      </td>
                      <td style={tableStyles.cell}>{premise.hriPoi}</td>
                      <td style={tableStyles.cell}>
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
                                  option ===
                                  (premise.origin || originOptions[0])
                                }
                                sx={{ marginRight: 1 }}
                              />
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            <Box sx={tableStyles.footer}>
              <Typography variant="caption" color="text.secondary">
                {`1 - ${selectedPremises.length} of ${selectedPremises.length}`}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
            }}
          >
            <Box
              component="img"
              src="src/assets/empty_state.png"
              alt="No results"
              sx={{ width: 200, mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              No results available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please try searching by address, enforcement number or premises
              name
            </Typography>
          </Box>
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
