import React from "react";
import { Box, Button, Tabs, Tab, Typography } from "@mui/material";
import { Premise } from "../../types/premises";
import { dummyRecommendedPremises } from "../../data/dummyRecommendedPremises";
import { styles } from "./styles";
import { PremisesTable } from "./components/PremisesTable/PremisesTable";
import { PremisesSearch } from "./components/PremisesSearch/PremisesSearch";
import { EmptyState } from "../../common/components/EmptyState/EmptyState";
import { BaseModal } from "../../common/components/BaseModal/BaseModal";
import { useAddPremises } from "./hooks/useAddPremises";

interface AddPremisesModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (premises: Premise[]) => void;
  existingPremises: Premise[];
  totalRequiredPremises: number;
}

export const AddPremisesModal: React.FC<AddPremisesModalProps> = ({
  open,
  onClose,
  onSave,
  existingPremises,
  totalRequiredPremises,
}) => {
  const {
    tabValue,
    searchQuery,
    selectedPremises,
    availablePremises,
    handleTabChange,
    setSearchQuery,
    setSelectedPremises,
    handleOriginChange,
    handleAutocompleteSelect,
    resetState,
  } = useAddPremises({ existingPremises, totalRequiredPremises, open });

  const handleSave = () => {
    onSave(selectedPremises);
    resetState();
    onClose();
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

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
          <EmptyState
            message="No matching results found"
            sx={styles.emptyState}
          />
        ) : (
          <EmptyState
            message="No matching results found"
            subMessage="Try searching by address, enforcement number or premises name"
            sx={styles.emptyState}
          />
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
        disableEnforceFocus: true,
        disableAutoFocus: true,
      }}
    >
      <Box sx={styles.container}>
        <Box sx={styles.tabContainer}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            TabIndicatorProps={{ children: <span /> }}
            sx={{
              "& .MuiTabs-indicator": {
                display: "flex",
                justifyContent: "center",
                backgroundColor: "transparent",
              },
            }}
          >
            <Tab label="Search" disableFocusRipple disableRipple />
            <Tab label="Recommend" disableFocusRipple disableRipple />
          </Tabs>
        </Box>
        {tabValue === 0 ? renderSearchTab() : renderRecommendTab()}
      </Box>
    </BaseModal>
  );
};

export default AddPremisesModal;
