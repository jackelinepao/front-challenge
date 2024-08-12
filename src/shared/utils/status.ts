import { Status } from "../graphql/generated/types";

type StatusType = `${Status}`;

export const getStatus = (value: StatusType): string => {
  switch (value) {
    case "BACKLOG":
      return "Working";
    case "IN_PROGRESS":
      return "In Progress";
    case "DONE":
      return "Completed";
    case "TODO":
      return "To do";
    default:
      return "Cancel";
  }
};

export const statusArray = Object.values(Status).map((value) => ({
  value,
  label: getStatus(value as StatusType),
}));
