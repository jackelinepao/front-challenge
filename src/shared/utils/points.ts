import { PointEstimate } from "../graphql/generated/types";

type PointEstimateType = `${PointEstimate}`;

export const getLabel = (value: PointEstimateType): string => {
  switch (value) {
    case "ZERO":
      return "0 Points";
    case "ONE":
      return "1 Point";
    case "TWO":
      return "2 Points";
    case "FOUR":
      return "4 Points";
    default:
      return "8 Points";
  }
};

// Generate the pointArray with labels
export const pointArray = Object.values(PointEstimate).map((value) => ({
  value,
  label: getLabel(value as PointEstimateType),
}));
