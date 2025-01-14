import React, { useState, useEffect } from "react";
import { Box, Button, Tabs, Tab, Typography } from "@mui/material";
import { dummyPremises } from "../../data/dummyPremises";
import { Premise } from "../../types/premises";
import { dummyRecommendedPremises } from "../../data/dummyRecommendedPremises";
import { styles } from "./styles";
import { PremisesTable } from "./components/PremisesTable";
import { PremisesSearch } from "./components/PremisesSearch";
import { EmptyState } from "./components/EmptyState";
import { BaseModal } from "../../common/components/BaseModal/BaseModal";

interface AddPremisesModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (premises: Premise[]) => void;
  existingPremises: Premise[];
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
  const [selectedPremises, setSelectedPremises] = useState<Premise[]>([]);
  const [filteredPremises, setFilteredPremises] = useState<Premise[]>([]);

  const availablePremises = filteredPremises.filter(
    (premise) =>
      !selectedPremises.some(
        (selected) => selected.enforcementNumber === premise.enforcementNumber
      ) &&
      !existingPremises.some(
        (existing) => existing.enforcementNumber === premise.enforcementNumber
      )
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
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
    onSave(selectedPremises);
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

  const handleAutocompleteSelect = (selectedPremise: Premise | null) => {
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

  useEffect(() => {
    if (tabValue === 1) {
      const remainingNeeded = totalRequiredPremises - existingPremises.length;

      const availableRecommended = dummyRecommendedPremises.filter(
        (premise) =>
          !existingPremises.some(
            (p) => p.enforcementNumber === premise.enforcementNumber
          )
      );

      const initialRecommended = availableRecommended.slice(0, remainingNeeded);

      setSelectedPremises(initialRecommended);
    } else if (tabValue === 0) {
      setSelectedPremises([]);
    }
  }, [tabValue, totalRequiredPremises, existingPremises]);

  const renderSearchTab = () => (
    <Box sx={styles.searchContainer}>
      <PremisesSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        availablePremises={availablePremises}
        onPremiseSelect={handleAutocompleteSelect}
      />
      <Box sx={{ mt: "20px" }}>
        {selectedPremises.length > 0 ? (
          <PremisesTable
            premises={selectedPremises}
            selectedPremises={selectedPremises}
            onPremisesSelect={setSelectedPremises}
            onOriginChange={handleOriginChange}
            title={`${selectedPremises.length} Premises Selected`}
          />
        ) : searchQuery && availablePremises.length === 0 ? (
          <EmptyState message="No matching results found" />
        ) : (
          <EmptyState message="Please try searching by address, enforcement number or premises name" />
        )}
      </Box>
    </Box>
  );

  const renderRecommendTab = () => {
    const availableRecommendedPremises = dummyRecommendedPremises.filter(
      (premise) =>
        !existingPremises.some(
          (existing) => existing.enforcementNumber === premise.enforcementNumber
        )
    );

    const selectedRecommendedCount = selectedPremises.filter((selected) =>
      availableRecommendedPremises.some(
        (recommended) =>
          recommended.enforcementNumber === selected.enforcementNumber
      )
    ).length;

    return (
      <Box sx={styles.searchContainer}>
        <PremisesTable
          premises={availableRecommendedPremises}
          selectedPremises={selectedPremises}
          onPremisesSelect={setSelectedPremises}
          onOriginChange={handleOriginChange}
          title={`${selectedRecommendedCount} Premises Recommended`}
          totalCount={availableRecommendedPremises.length}
          showOriginSelector={false}
        />
      </Box>
    );
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title={
        <Box sx={styles.header}>
          <Typography>Add Premises</Typography>
        </Box>
      }
      footer={
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
      }
      modalProps={{
        PaperProps: {
          sx: {
            width: "1254px",
            padding: "20px",
            borderRadius: "16px",
          },
        },
      }}
    >
      <Box sx={styles.container}>
        <Box sx={styles.tabContainer}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Search" />
            <Tab label="Recommend" />
          </Tabs>
        </Box>
        {tabValue === 0 ? renderSearchTab() : renderRecommendTab()}
      </Box>
    </BaseModal>
  );
};

export default AddPremisesModal;
