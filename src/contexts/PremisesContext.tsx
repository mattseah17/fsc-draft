import React, { createContext, useContext, useState, ReactNode } from "react";
import { Premise } from "../types/premises";

interface PremisesContextType {
  premises: Premise[];
  updatePremises: (premises: Premise[]) => void;
  updatePremiseAvailability: (
    enforcementNumber: string,
    availability: "available" | "unavailable" | "pending"
  ) => void;
}

const PremisesContext = createContext<PremisesContextType | undefined>(
  undefined
);

export const PremisesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [premises, setPremises] = useState<Premise[]>([]);

  const updatePremises = (newPremises: Premise[]) => {
    setPremises(newPremises);
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
      value={{ premises, updatePremises, updatePremiseAvailability }}
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
