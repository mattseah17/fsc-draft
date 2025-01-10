import React, { createContext, useContext, useState, ReactNode } from "react";
import { Premise } from "../types/premises";

interface PremisesContextType {
  premises: Premise[];
  updatePremises: (premises: Premise[]) => void;
  updatePremiseAvailability: (
    enforcementNumber: string,
    availability: "available" | "unavailable" | "pending"
  ) => void;
  isPendingRotaVerification: boolean;
  setPendingRotaVerification: (pending: boolean) => void;
}

const PremisesContext = createContext<PremisesContextType | undefined>(
  undefined
);

export const PremisesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [premises, setPremises] = useState<Premise[]>(() => {
    // Load premises from localStorage on initial render
    const savedPremises = localStorage.getItem("premises");
    return savedPremises ? JSON.parse(savedPremises) : [];
  });

  const [isPendingRotaVerification, setPendingRotaVerification] = useState(
    () => {
      // Load verification state from localStorage on initial render
      const savedVerificationState = localStorage.getItem(
        "isPendingRotaVerification"
      );
      return savedVerificationState
        ? JSON.parse(savedVerificationState)
        : false;
    }
  );

  const updatePremises = (newPremises: Premise[]) => {
    setPremises(newPremises);
    // Save to localStorage whenever premises are updated
    localStorage.setItem("premises", JSON.stringify(newPremises));
  };

  // Create a wrapped setPendingRotaVerification that saves to localStorage
  const handleSetPendingRotaVerification = (pending: boolean) => {
    setPendingRotaVerification(pending);
    localStorage.setItem("isPendingRotaVerification", JSON.stringify(pending));
  };

  const updatePremiseAvailability = (
    enforcementNumber: string,
    availability: "available" | "unavailable" | "pending"
  ) => {
    setPremises((prev) =>
      prev.map((premise) =>
        premise.enforcementNumber === enforcementNumber
          ? { ...premise, availability }
          : premise
      )
    );
  };

  return (
    <PremisesContext.Provider
      value={{
        premises,
        updatePremises,
        updatePremiseAvailability,
        isPendingRotaVerification,
        setPendingRotaVerification: handleSetPendingRotaVerification,
      }}
    >
      {children}
    </PremisesContext.Provider>
  );
};

export const usePremises = () => {
  const context = useContext(PremisesContext);
  if (context === undefined) {
    throw new Error("usePremises must be used within a PremisesProvider");
  }
  return context;
};
