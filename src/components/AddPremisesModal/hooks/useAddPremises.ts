import { useState, useEffect } from "react";
import { Premise, OriginType } from "../../../types/premises";
import { dummyPremises } from "../../../data/dummyPremises";
import { dummyRecommendedPremises } from "../../../data/dummyRecommendedPremises";

interface UseAddPremisesProps {
  existingPremises: Premise[];
  totalRequiredPremises: number;
  open: boolean;
}

export const useAddPremises = ({
  existingPremises,
  totalRequiredPremises,
  open,
}: UseAddPremisesProps) => {
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

  const resetState = () => {
    setSelectedPremises([]);
    setSearchQuery("");
    setFilteredPremises([]);
    setTabValue(0);
  };

  useEffect(() => {
    if (!open) {
      resetState();
    }
  }, [open]);

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

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSearchQuery("");
    setFilteredPremises([]);
  };

  const handleOriginChange = (premiseId: string, newOrigins: OriginType[]) => {
    setSelectedPremises((prevPremises) =>
      prevPremises.map((premise) =>
        premise.enforcementNumber === premiseId
          ? { ...premise, origin: newOrigins }
          : premise
      )
    );
  };

  const handleAutocompleteSelect = (selectedPremise: Premise | null) => {
    if (selectedPremise) {
      if (
        !selectedPremises.some(
          (p) => p.enforcementNumber === selectedPremise.enforcementNumber
        )
      ) {
        setSelectedPremises([
          ...selectedPremises,
          { ...selectedPremise, origin: ["Ops Survey"] },
        ]);
      }
      setSearchQuery("");
      setFilteredPremises([]);
    }
  };

  return {
    tabValue,
    searchQuery,
    selectedPremises,
    filteredPremises,
    availablePremises,
    handleTabChange,
    setSearchQuery,
    setSelectedPremises,
    handleOriginChange,
    handleAutocompleteSelect,
    resetState,
  };
};
