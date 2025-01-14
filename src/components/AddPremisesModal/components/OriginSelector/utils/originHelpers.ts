import { OriginType } from "../../../../../types/premises";

export const normalizeOrigins = (
  origin: OriginType | OriginType[] | undefined
): OriginType[] => {
  return Array.isArray(origin) ? origin : [];
};

export const createOriginHandler = (
  onOriginChange: (premiseId: string, origins: OriginType[]) => void,
  premiseId: string
) => {
  return (event: { target: { value: string | string[] } }) => {
    const { value } = event.target;
    const newValue = typeof value === "string" ? [value] : value;
    onOriginChange(premiseId, newValue as OriginType[]);
  };
};
