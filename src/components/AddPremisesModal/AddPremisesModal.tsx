import React, { useState, useEffect } from "react";
import { Dialog, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { dummyPremises } from "../../data/dummyPremises";
import { Premises } from "../../types/premises";
import { dummyRecommendedPremises } from "../../data/dummyRecommendedPremises";
import { styles } from "./styles";
import { PremisesTable } from "./components/PremisesTable";
import { PremisesSearch } from "./components/PremisesSearch";
import { EmptyState } from "./components/EmptyState";

interface AddPremisesModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (premises: Premises[]) => void;
  existingPremises: Premises[];
  totalRequiredPremises: number;
}

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

  useEffect(() => {
    if (!open) {
      setSelectedPremises([]);
      setSearchQuery("");
      setFilteredPremises([]);
      setTabValue(0);
    }
  }, [open]);

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

  const remainingPremisesNeeded =
    totalRequiredPremises - (existingPremises.length + selectedPremises.length);

  const renderSearchTab = () => (
    <Box sx={styles.searchContainer}>
      <PremisesSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        availablePremises={availablePremises}
        onPremiseSelect={handleAutocompleteSelect}
      />
      {selectedPremises.length > 0 ? (
        <PremisesTable
          premises={selectedPremises}
          selectedPremises={selectedPremises}
          onPremisesSelect={setSelectedPremises}
          onOriginChange={handleOriginChange}
          title={`${selectedPremises.length} Premises Selected`}
        />
      ) : searchQuery ? (
        <EmptyState message="No matching results found" />
      ) : (
        <EmptyState message="Please try searching by address, enforcement number or premises name" />
      )}
    </Box>
  );

  const renderRecommendTab = () => (
    <Box sx={styles.searchContainer}>
      <PremisesTable
        premises={dummyRecommendedPremises}
        selectedPremises={selectedPremises}
        onPremisesSelect={setSelectedPremises}
        onOriginChange={handleOriginChange}
        title={`${remainingPremisesNeeded} Premises Recommended`}
        totalCount={dummyRecommendedPremises.length}
      />
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{ sx: styles.dialog }}
    >
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography variant="h6">Add Premises</Typography>
          <Button onClick={onClose}>
            <ClearIcon sx={{ color: "black" }} />
          </Button>
        </Box>

        <Box sx={styles.tabContainer}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Search" />
            <Tab label="Recommend" />
          </Tabs>
        </Box>

        {tabValue === 0 ? renderSearchTab() : renderRecommendTab()}

        <Box sx={styles.footer}>
          <Button variant="text" onClick={onClose} sx={{ color: "#757575" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ bgcolor: "#1976D2" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddPremisesModal;
