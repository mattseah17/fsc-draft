export type AvailabilityStatus = "pending" | "available" | "unavailable";

export type OriginType =
  | "Ops Survey"
  | "Cert Audit"
  | "HRI Exercise"
  | "Outside Drill"
  | "Adhoc";

export interface Premise {
  enforcementNumber: string;
  premisesName: string;
  address: string;
  lastInspectionDate: string;
  propensityScore: number;
  hriPoi: string;
  origin: OriginType[];
  assignedRota?: string;
  availability?: AvailabilityStatus;
}
