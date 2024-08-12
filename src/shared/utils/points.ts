import { PointEstimate } from "../graphql/generated/types";

type PointEstimateType = `${PointEstimate}`;

export const getLabelPoints = (value: PointEstimateType) => {
  switch (value) {
    case "ZERO":
      return { title: "0 Points" };
    case "ONE":
      return { title: "1 Point" };
    case "TWO":
      return { title: "2 Points" };
    case "FOUR":
      return { title: "4 Points" };
    default:
      return { title: "8 Points" };
  }
};

// Generate the pointArray with labels
export const pointArray = Object.values(PointEstimate).map((value) => ({
  value,
  label: getLabelPoints(value as PointEstimateType).title,
}));

console.log({ pointArray }, { PointEstimate });
