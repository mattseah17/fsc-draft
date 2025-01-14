import React from "react";
import { Select, MenuItem, Checkbox } from "@mui/material";
import { Premise, OriginType } from "../../../../types/premises";
import { styles } from "./OriginSelector.styles";
import { ORIGIN_TYPES } from "../../../../constants/origins";
import { normalizeOrigins, createOriginHandler } from "./utils/originHelpers";

interface OriginSelectorProps {
  premise: Premise;
  onOriginChange: (premiseId: string, origins: OriginType[]) => void;
}

export const OriginSelector: React.FC<OriginSelectorProps> = ({
  premise,
  onOriginChange,
}) => {
  const currentOrigins = normalizeOrigins(premise.origin);
  const handleChange = createOriginHandler(
    onOriginChange,
    premise.enforcementNumber
  );

  return (
    <Select
      multiple
      value={currentOrigins}
      onChange={handleChange}
      sx={styles.select}
      size="small"
      renderValue={(selected) => (selected as string[]).join(", ")}
    >
      {ORIGIN_TYPES.map((option) => (
        <MenuItem key={option} value={option} sx={styles.menuItem}>
          <Checkbox checked={currentOrigins.includes(option)} />
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};
