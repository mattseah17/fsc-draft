import React from "react";
import { Autocomplete, TextField, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Premise } from "../../../../types/premises";
import { styles } from "./PremisesSearch.styles";

interface PremisesSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availablePremises: Premise[];
  onPremiseSelect: (premise: Premise | null) => void;
}

export const PremisesSearch: React.FC<PremisesSearchProps> = ({
  searchQuery,
  onSearchChange,
  availablePremises,
  onPremiseSelect,
}) => {
  return (
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
      onInputChange={(_, newInputValue) => onSearchChange(newInputValue)}
      sx={styles.autocomplete}
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
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <Box component="li" key={key} {...otherProps}>
            <Box>
              <Typography variant="subtitle1">{option.premisesName}</Typography>
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
        );
      }}
      onChange={(_, newValue) => onPremiseSelect(newValue as Premise | null)}
    />
  );
};
