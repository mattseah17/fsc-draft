import React from "react";
import { Select, MenuItem } from "@mui/material";
import { Premise, OriginType } from "../../../../types/premises";
import { styles } from "./OriginSelector.styles";
import Checkbox from "@mui/material/Checkbox";

interface OriginSelectorProps {
  premise: Premise;
  onOriginChange: (premiseId: string, origins: OriginType[]) => void;
}

export const OriginSelector: React.FC<OriginSelectorProps> = ({
  premise,
  onOriginChange,
}) => {
  const handleChange = (event: {
    target: { value: string | OriginType[] };
  }) => {
    const {
      target: { value },
    } = event;
    onOriginChange(
      premise.enforcementNumber,
      typeof value === "string"
        ? [value as OriginType]
        : (value as OriginType[])
    );
  };

  return (
    <Select
      multiple
      value={premise.origin || []}
      onChange={handleChange}
      sx={styles.select}
      size="small"
      renderValue={(selected) => selected.join(", ")}
    >
      {[
        "Ops Survey",
        "Cert Audit",
        "HRI Exercise",
        "Outside Drill",
        "Adhoc",
      ].map((option) => (
        <MenuItem key={option} value={option} sx={styles.menuItem}>
          <Checkbox checked={premise.origin?.includes(option as OriginType)} />
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};
