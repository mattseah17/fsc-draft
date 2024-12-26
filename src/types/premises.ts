export interface Premises {
  enforcementNumber: string;
  premisesName: string;
  address: string;
  lastInspectionDate: string;
  propensityScore: number;
  hriPoi: "HRI" | "POI";
  origin:
    | "Ops Survey"
    | "Cert Audit"
    | "HRI Exercise"
    | "Outside Drill"
    | "Adhoc";
}
