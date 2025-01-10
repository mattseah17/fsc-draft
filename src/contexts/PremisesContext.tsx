import React, { createContext, useContext, useState, ReactNode } from "react";
import { Premise } from "../types/premises";

interface PremisesContextType {
  premises: Premise[];
  updatePremises: (premises: Premise[]) => void;
  updatePremiseAvailability: (
    enforcementNumber: string,
    availability: "available" | "unavailable" | "pending"
  ) => void;
  isConfirmed: boolean;
  setIsConfirmed: (confirmed: boolean) => void;
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

  const [isConfirmed, setIsConfirmed] = useState(() => {
    // Load confirmed state from localStorage on initial render
    const savedConfirmed = localStorage.getItem("isConfirmed");
    return savedConfirmed ? JSON.parse(savedConfirmed) : false;
  });

  const updatePremises = (newPremises: Premise[]) => {
    setPremises(newPremises);
    // Save to localStorage whenever premises are updated
    localStorage.setItem("premises", JSON.stringify(newPremises));
  };

  // Create a wrapped setIsConfirmed that saves to localStorage
  const handleSetIsConfirmed = (confirmed: boolean) => {
    setIsConfirmed(confirmed);
    localStorage.setItem("isConfirmed", JSON.stringify(confirmed));
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
        isConfirmed,
        setIsConfirmed: handleSetIsConfirmed,
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
