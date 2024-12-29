import React from "react";
import { Select, MenuItem } from "@mui/material";
import { Premises } from "../../../types/premises";
import { styles } from "../styles";

type OriginType =
  | "Ops Survey"
  | "Cert Audit"
  | "HRI Exercise"
  | "Outside Drill"
  | "Adhoc";

interface OriginSelectorProps {
  premise: Premises;
  onOriginChange: (premiseId: string, origin: OriginType) => void;
}

export const OriginSelector: React.FC<OriginSelectorProps> = ({
  premise,
  onOriginChange,
}) => {
  return (
    <Select
      value={premise.origin || ""}
      onChange={(e) =>
        onOriginChange(premise.enforcementNumber, e.target.value as OriginType)
      }
      sx={styles.select}
      size="small"
    >
      <MenuItem value="Ops Survey">Ops Survey</MenuItem>
      <MenuItem value="Cert Audit">Cert Audit</MenuItem>
      <MenuItem value="HRI Exercise">HRI Exercise</MenuItem>
      <MenuItem value="Outside Drill">Outside Drill</MenuItem>
      <MenuItem value="Adhoc">Adhoc</MenuItem>
    </Select>
  );
};
