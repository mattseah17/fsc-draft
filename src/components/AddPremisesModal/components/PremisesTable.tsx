import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
} from "@mui/material";
import { Premise } from "../../../types/premises";
import { styles } from "../styles";
import { OriginSelector } from "./OriginSelector";

type OriginType =
  | "Ops Survey"
  | "Cert Audit"
  | "HRI Exercise"
  | "Outside Drill"
  | "Adhoc";

interface PremisesTableProps {
  premises: Premise[];
  selectedPremises: Premise[];
  onPremisesSelect: (premises: Premise[]) => void;
  onOriginChange: (premiseId: string, origin: OriginType) => void;
  title: string;
  totalCount?: number;
  showOriginSelector?: boolean;
}

export const PremisesTable: React.FC<PremisesTableProps> = ({
  premises,
  selectedPremises,
  onPremisesSelect,
  onOriginChange,
  title,
  totalCount,
  showOriginSelector = true,
}) => {
  const areAllSelected = (visiblePremises: Premise[]) => {
    if (visiblePremises.length === 0) return false;
    return visiblePremises.every((premise) =>
      selectedPremises.some(
        (p) => p.enforcementNumber === premise.enforcementNumber
      )
    );
  };

  const handleHeaderCheckboxChange = (visiblePremises: Premise[]) => {
    if (areAllSelected(visiblePremises)) {
      onPremisesSelect(
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
      onPremisesSelect([...selectedPremises, ...newPremises]);
    }
  };

  return (
    <>
      <Box sx={styles.table.title}>
        <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          ...styles.table.headerAndContent,
          height: "280px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.table.headerCell}>
                <Checkbox
                  checked={areAllSelected(premises)}
                  onChange={() => handleHeaderCheckboxChange(premises)}
                />
              </TableCell>
              <TableCell sx={styles.table.headerCell}>
                Enforcement Number
              </TableCell>
              <TableCell sx={styles.table.headerCell}>Premises Name</TableCell>
              <TableCell sx={styles.table.headerCell}>Address</TableCell>
              <TableCell sx={styles.table.headerCell}>
                Last Inspection Date
              </TableCell>
              <TableCell sx={styles.table.headerCell}>
                Propensity Score
              </TableCell>
              <TableCell sx={styles.table.headerCell}>HRI/POI</TableCell>
              <TableCell sx={styles.table.headerCell}>Origin</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ overflow: "auto" }}>
            {premises.map((premise) => (
              <TableRow key={premise.enforcementNumber}>
                <TableCell sx={styles.table.cell}>
                  <Checkbox
                    checked={selectedPremises.some(
                      (p) => p.enforcementNumber === premise.enforcementNumber
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onPremisesSelect([...selectedPremises, premise]);
                      } else {
                        onPremisesSelect(
                          selectedPremises.filter(
                            (p) =>
                              p.enforcementNumber !== premise.enforcementNumber
                          )
                        );
                      }
                    }}
                  />
                </TableCell>
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
                <TableCell sx={styles.table.cell}>
                  {showOriginSelector ? (
                    <OriginSelector
                      premise={premise}
                      onOriginChange={onOriginChange}
                    />
                  ) : (
                    premise.origin
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box sx={styles.table.footer}>
        <Typography sx={{ fontSize: "12px", color: "#757575" }}>
          {`1 - ${premises.length} of ${totalCount || premises.length}`}
        </Typography>
      </Box>
    </>
  );
};
